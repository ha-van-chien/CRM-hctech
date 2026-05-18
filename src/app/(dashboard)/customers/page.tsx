"use client";
import { useState, useMemo } from "react";
import { CustomerList, Customer } from "@/lib/types";
import CustomerTableWithSelection from "@/components/customers/CustomerTableWithSelection";
import CustomerListManager from "@/components/customers/CustomerListManager";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Icons } from "@/components/icons";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { useApp } from "@/context/AppContext";

export default function CustomersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { visibleCustomers } = useApp();
  const [lists, setLists] = useState<CustomerList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [detailModalId, setDetailModalId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkListModal, setShowBulkListModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  // Filtering logic
  const filteredCustomers = useMemo(() => {
    let result = visibleCustomers;
    
    // Filter by active list
    if (activeListId) {
      const list = lists.find(l => l.id === activeListId);
      if (list) {
        result = result.filter(c => list.customerIds.includes(c.id));
      }
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
      );
    }

    return result;
  }, [visibleCustomers, activeListId, lists, searchQuery]);

  const handleAddList = (name: string) => {
    if (name) {
      const newList: CustomerList = {
        id: `list-${Date.now()}`,
        name,
        description: "",
        customerIds: [],
        ownerId: "u1",
        createdAt: new Date().toISOString()
      };
      setLists([...lists, newList]);
      toast(`Đã tạo danh sách "${name}"`, "success");
      setShowCreateListModal(false);
      setNewListName("");
    }
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(l => l.id !== id));
    if (activeListId === id) setActiveListId(null);
    toast("Đã xóa danh sách", "success");
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddSelectedToList = (listIndex: number) => {
    if (lists[listIndex]) {
      const targetList = lists[listIndex];
      const newIds = Array.from(new Set([...targetList.customerIds, ...selectedIds]));
      setLists(lists.map(l => l.id === targetList.id ? { ...l, customerIds: newIds } : l));
      setSelectedIds([]);
      setShowBulkListModal(false);
      toast(`Đã thêm vào danh sách ${targetList.name}`, "success");
    }
  };

  const triggerAddSelectedToList = () => {
    if (selectedIds.length === 0) return;
    if (lists.length === 0) {
      toast("Hãy tạo một danh sách trước", "error");
      return;
    }
    setShowBulkListModal(true);
  };

  const handleRemoveFromList = () => {
    if (!activeListId || selectedIds.length === 0) return;
    setLists(lists.map(l => {
      if (l.id === activeListId) {
        return { ...l, customerIds: l.customerIds.filter(id => !selectedIds.includes(id)) };
      }
      return l;
    }));
    setSelectedIds([]);
    toast("Đã xóa khỏi danh sách", "success");
  };

  const handleExportCSV = () => {
    const data = filteredCustomers.map(c => ({
      'Tên khách hàng': c.name,
      'Email': c.email,
      'Số điện thoại': c.phone,
      'Phân khúc': c.segment,
      'Địa chỉ': c.address,
      'Ghi chú': c.notes
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `danh_sach_khach_hang_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Đã xuất file thành công", "success");
  };

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Khách hàng</h1>
          <p style={{ color: 'var(--c-on-variant)' }}>Quản lý và phân loại danh sách đối tác.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="ghost" onClick={() => router.push('/import')}>
            <Icons.upload size={18} style={{ marginRight: '8px' }} /> Nhập CSV
          </Button>
          <Button variant="ghost" onClick={handleExportCSV}>
            <Icons.download size={18} style={{ marginRight: '8px' }} /> Xuất CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)}>+ Thêm khách hàng</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', flex: 1, minHeight: 0 }}>
        {/* Sidebar for lists */}
        <aside style={{ borderRight: '1px solid var(--c-outline-variant)', paddingRight: '1.5rem' }}>
          <CustomerListManager 
            lists={lists}
            activeListId={activeListId}
            onSelectList={setActiveListId}
            onAddList={() => setShowCreateListModal(true)}
            onDeleteList={handleDeleteList}
          />
        </aside>

        {/* Main Content */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 0 }}>
          <div style={{ position: 'relative' }}>
            <Input 
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Icons.search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-on-variant)' }} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <CustomerTableWithSelection 
              customers={filteredCustomers}
              selectedIds={selectedIds}
              onSelect={handleToggleSelect}
              onSelectAll={setSelectedIds}
              onViewDetail={(id) => setDetailModalId(id)}
            />
          </div>

          {/* Bulk Action Bar */}
          {selectedIds.length > 0 && (
            <div style={{
              position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              backgroundColor: '#1E40AF', color: 'white', padding: '1rem 2rem',
              borderRadius: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 100,
              border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)'
            }}>
              <span style={{ fontWeight: 600 }}>Đã chọn {selectedIds.length} khách hàng</span>
              <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button size="sm" variant="ghost" onClick={triggerAddSelectedToList} style={{ color: 'white' }}>
                  <Icons.plus size={16} style={{ marginRight: '8px' }} /> Thêm vào danh sách
                </Button>
                {activeListId && (
                  <Button size="sm" variant="ghost" onClick={handleRemoveFromList} style={{ color: '#ef4444' }}>
                    <Icons.trash size={16} style={{ marginRight: '8px' }} /> Xóa khỏi danh sách
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])} style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal */}
      {detailModalId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-pop-in flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{visibleCustomers.find(c => c.id === detailModalId)?.name}</h2>
                <p className="text-sm text-slate-500 mt-1">{visibleCustomers.find(c => c.id === detailModalId)?.email}</p>
              </div>
              <button onClick={() => setDetailModalId(null)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Số điện thoại</div>
                  <div className="font-medium text-slate-800">{visibleCustomers.find(c => c.id === detailModalId)?.phone}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Phân khúc</div>
                  <div className="font-medium text-slate-800 bg-blue-50 text-blue-700 px-2 py-1 rounded-md inline-block mt-1">
                    {visibleCustomers.find(c => c.id === detailModalId)?.segment}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Địa chỉ</div>
                  <div className="font-medium text-slate-800">{visibleCustomers.find(c => c.id === detailModalId)?.address}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Ghi chú</div>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg mt-1 border border-slate-100">
                    {visibleCustomers.find(c => c.id === detailModalId)?.notes || "Không có ghi chú."}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button onClick={() => setDetailModalId(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-pop-in flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h2 className="text-lg font-bold text-slate-900">Thêm khách hàng mới</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); toast("Đã thêm khách hàng mới!", "success"); setShowAddModal(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tên khách hàng</label>
                <Input required placeholder="Nhập tên..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Số điện thoại</label>
                  <Input required placeholder="Số ĐT..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <Input type="email" placeholder="Email..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>Hủy</Button>
                <Button type="submit">Lưu khách hàng</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Bulk List Modal */}
      {showBulkListModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-pop-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Chọn danh sách</h2>
              <button onClick={() => setShowBulkListModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-2 max-h-60 overflow-y-auto">
              {lists.map((list, index) => (
                <button 
                  key={list.id} 
                  onClick={() => handleAddSelectedToList(index)}
                  className="text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-accent hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  {list.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create List Modal */}
      {showCreateListModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-pop-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Tạo danh sách mới</h2>
              <button onClick={() => setShowCreateListModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6">
              <Input 
                autoFocus
                placeholder="Nhập tên danh sách..." 
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddList(newListName);
                }}
              />
              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="ghost" onClick={() => setShowCreateListModal(false)}>Hủy</Button>
                <Button onClick={() => handleAddList(newListName)}>Lưu</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
