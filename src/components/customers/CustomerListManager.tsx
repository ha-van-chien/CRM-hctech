"use client";
import { useState } from "react";
import { CustomerList } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icons } from "@/components/icons";

interface CustomerListManagerProps {
  lists: CustomerList[];
  activeListId: string | null;
  onSelectList: (id: string | null) => void;
  onAddList: () => void;
  onDeleteList: (id: string) => void;
}

export default function CustomerListManager({ 
  lists, 
  activeListId, 
  onSelectList, 
  onAddList,
  onDeleteList 
}: CustomerListManagerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--c-on-variant)', letterSpacing: '0.05em' }}>
          Danh sách của tôi
        </h3>
        <button 
          onClick={onAddList}
          style={{ 
            background: 'none', border: 'none', color: 'var(--c-primary)', 
            cursor: 'pointer', fontSize: '1.25rem', padding: '0 4px' 
          }}
        >
          +
        </button>
      </div>

      <div 
        onClick={() => onSelectList(null)}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          backgroundColor: activeListId === null ? 'var(--c-primary-bg)' : 'transparent',
          color: activeListId === null ? 'var(--c-primary)' : 'var(--c-on-surface)',
          fontWeight: activeListId === null ? 600 : 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.2s'
        }}
      >
        <Icons.users size={18} />
        Tất cả khách hàng
      </div>

      {lists.map(list => (
        <div 
          key={list.id}
          onClick={() => onSelectList(list.id)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            backgroundColor: activeListId === list.id ? 'var(--c-primary-bg)' : 'transparent',
            color: activeListId === list.id ? 'var(--c-primary)' : 'var(--c-on-surface)',
            fontWeight: activeListId === list.id ? 600 : 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            transition: 'all 0.2s',
          }}
          className="customer-list-item group"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, overflow: 'hidden' }}>
            <Icons.list size={18} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{list.name}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if(confirm(`Xóa danh sách "${list.name}"?`)) onDeleteList(list.id);
            }}
            style={{ 
              background: 'none', border: 'none', color: 'var(--c-on-variant)', 
              opacity: 0.5, cursor: 'pointer', padding: '4px'
            }}
            className="delete-list-btn"
          >
            <Icons.trash size={14} />
          </button>
        </div>
      ))}

      <style jsx>{`
        .customer-list-item:hover .delete-list-btn {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
