"use client";
import React, { useState, useEffect } from 'react';
import { Customer, getCustomers, SEGMENTS } from '@/lib/mockData';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Khách hàng</h1>
        <Button onClick={() => setShowAddModal(true)}>+ Thêm Khách hàng</Button>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <Input placeholder="Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="input" style={{ width: '200px' }}><option>Tất cả phân khúc</option></select>
        </div>

        {isLoading ? <TableSkeleton rows={5} /> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '1rem' }}>Tên Công ty</th>
                  <th style={{ padding: '1rem' }}>Người liên hệ</th>
                  <th style={{ padding: '1rem' }}>Phân khúc</th>
                  <th style={{ padding: '1rem' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '1rem' }}><Link href={`/customers/${c.id}/`} style={{ fontWeight: 600, color: 'var(--primary)' }}>{c.name}</Link></td>
                    <td style={{ padding: '1rem' }}>{c.contact_person}</td>
                    <td style={{ padding: '1rem' }}><Badge variant="info">{c.segment}</Badge></td>
                    <td style={{ padding: '1rem' }}><Button variant="ghost" size="sm" onClick={() => toast("Tính năng đang chuẩn bị", "info")}>Sửa</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Thêm Khách hàng mới">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Tên Công ty" />
          <Button onClick={() => { toast("Thành công!", "success"); setShowAddModal(false); }}>Lưu</Button>
        </div>
      </Modal>
    </div>
  );
}
