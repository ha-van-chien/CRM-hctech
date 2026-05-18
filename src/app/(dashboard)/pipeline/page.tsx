"use client";
import React, { useState } from 'react';
import { Opportunity } from '@/lib/types';
import { STAGES, formatCurrency } from '@/lib/constants';
import { useApp } from '@/context/AppContext';
import { Icons } from '@/components/icons';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableKanbanCard({ lead, onClick }: { lead: Opportunity, onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id, data: { type: 'Opportunity', lead } });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      onClick={onClick}
      className={`bg-white p-4 rounded-xl border ${isDragging ? 'border-accent shadow-md' : 'border-slate-200 shadow-sm'} cursor-grab active:cursor-grabbing hover:shadow-md hover:border-accent transition-all duration-200`}
    >
      <div className="font-semibold text-slate-800 text-sm mb-1 leading-tight">{lead.title}</div>
      <div className="text-xs text-slate-500 mb-3">{lead.customerName}</div>
      <div className="flex items-center justify-between mt-auto">
        <div className="font-bold text-accent text-sm">{formatCurrency(lead.value || 0)}</div>
      </div>
    </div>
  );
}

function KanbanColumn({ stage, leads, onCardClick }: { stage: any, leads: Opportunity[], onCardClick: (l: Opportunity) => void }) {
  const stageTotal = leads.reduce((sum, o) => sum + (o.value || 0), 0);
  const { setNodeRef } = useSortable({ id: stage.id, data: { type: 'Column', stage } });

  return (
    <div 
      className="w-[300px] shrink-0 bg-slate-50/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200 flex flex-col max-h-full snap-center"
    >
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }}></div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{stage.label}</h3>
        </div>
        <span className="text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
          {leads.length}
        </span>
      </div>
      
      <div className="text-xs font-medium text-slate-500 mb-3 shrink-0">
        Tổng: {formatCurrency(stageTotal)}
      </div>
      
      <div ref={setNodeRef} className="flex flex-col gap-3 overflow-y-auto min-h-[150px] p-1 -mx-1 flex-1">
        <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
          {leads.map(lead => (
            <SortableKanbanCard key={lead.id} lead={lead} onClick={() => onCardClick(lead)} />
          ))}
        </SortableContext>
        {leads.length === 0 && (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center text-slate-400 text-xs font-medium h-[100px] flex items-center justify-center pointer-events-none">
            Kéo thả vào đây
          </div>
        )}
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const { visibleOpportunities, moveOpportunity } = useApp();
  const [selectedLead, setSelectedLead] = useState<Opportunity | null>(null);
  const [activeLead, setActiveLead] = useState<Opportunity | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === 'Opportunity') {
      setActiveLead(active.data.current.lead);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isOverAColumn = over.data.current?.type === 'Column';
    const isOverAnOpportunity = over.data.current?.type === 'Opportunity';

    let newStageId = null;

    if (isOverAColumn) {
      newStageId = overId as string;
    } else if (isOverAnOpportunity) {
      newStageId = over.data.current?.lead?.stage;
    }

    if (newStageId) {
      moveOpportunity(activeId as string, newStageId as any);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col animate-fade-in">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cơ hội bán hàng</h1>
          <p className="text-sm text-slate-500 mt-1">Kéo thả thẻ để cập nhật trạng thái cơ hội</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
          <Icons.plus size={18} /> Thêm cơ hội
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start min-h-0 snap-x">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {STAGES.map(stage => (
            <KanbanColumn 
              key={stage.id} 
              stage={stage} 
              leads={visibleOpportunities.filter(o => o.stage === stage.id)} 
              onCardClick={setSelectedLead}
            />
          ))}
          <DragOverlay>
            {activeLead ? (
              <div className="bg-white p-4 rounded-xl border border-accent shadow-xl w-[268px] opacity-90 rotate-2">
                <div className="font-semibold text-slate-800 text-sm mb-1">{activeLead.title}</div>
                <div className="text-xs text-slate-500 mb-3">{activeLead.customerName}</div>
                <div className="font-bold text-accent text-sm">{formatCurrency(activeLead.value || 0)}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-pop-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{selectedLead.title}</h2>
                <p className="text-sm text-slate-500">{selectedLead.customerName}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Giá trị</div>
                  <div className="font-bold text-accent">{formatCurrency(selectedLead.value || 0)}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Ngày dự kiến</div>
                  <div className="font-medium text-slate-800">{selectedLead.dueDate}</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Ghi chú</div>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg mt-1">{selectedLead.notes || "Không có ghi chú."}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button onClick={() => setSelectedLead(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors">
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
              <h2 className="text-lg font-bold text-slate-900">Thêm cơ hội bán hàng</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <Icons.plus className="rotate-45" size={24} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Đã thêm cơ hội!"); setShowAddModal(false); }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Tên cơ hội</label>
                <input required placeholder="Nhập tên dự án/cơ hội..." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Giá trị dự kiến (VNĐ)</label>
                  <input required type="number" placeholder="50000000" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Giai đoạn</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent">
                    {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors">Lưu cơ hội</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
