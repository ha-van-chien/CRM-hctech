"use client";
import { Customer } from "@/lib/types";
import { Badge } from "@/components/ui/Card";
import { Icons } from "@/components/icons";

interface CustomerTableWithSelectionProps {
  customers: Customer[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onViewDetail: (id: string) => void;
}

export default function CustomerTableWithSelection({ 
  customers, 
  selectedIds, 
  onSelect, 
  onSelectAll,
  onViewDetail
}: CustomerTableWithSelectionProps) {
  const isAllSelected = customers.length > 0 && selectedIds.length === customers.length;

  return (
    <div style={{ overflowX: 'auto', backgroundColor: 'var(--c-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--c-outline-variant)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--c-outline-variant)', backgroundColor: 'var(--c-surface-low)' }}>
            <th style={{ padding: '1rem', width: '40px' }}>
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={() => onSelectAll(isAllSelected ? [] : customers.map(c => c.id))}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
            </th>
            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-on-variant)' }}>Khách hàng</th>
            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-on-variant)' }}>Phân khúc</th>
            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-on-variant)' }}>Liên hệ</th>
            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-on-variant)' }}>Sản phẩm</th>
            <th style={{ padding: '1rem', width: '80px' }}></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr 
              key={customer.id} 
              style={{ borderBottom: '1px solid var(--c-outline-variant)', transition: 'background-color 0.2s' }}
              className="hover:bg-slate-50"
            >
              <td style={{ padding: '1rem' }}>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(customer.id)}
                  onChange={() => onSelect(customer.id)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--c-on-surface)' }}>{customer.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--c-on-variant)' }}>ID: {customer.id}</div>
              </td>
              <td style={{ padding: '1rem' }}>
                <Badge variant="neutral">{customer.segment}</Badge>
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.875rem' }}>{customer.phone}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--c-on-variant)' }}>{customer.email}</div>
              </td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                  {customer.products.slice(0, 2).map(p => (
                    <span key={p} style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: 'var(--c-surface-container)', borderRadius: '4px' }}>
                      {p}
                    </span>
                  ))}
                  {customer.products.length > 2 && <span style={{ fontSize: '0.7rem' }}>+{customer.products.length - 2}</span>}
                </div>
              </td>
              <td style={{ padding: '1rem' }}>
                <button 
                  onClick={() => onViewDetail(customer.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--c-primary)', cursor: 'pointer' }}
                >
                  <Icons.externalLink size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
