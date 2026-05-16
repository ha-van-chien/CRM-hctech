"use client";
import { useRouter } from 'next/navigation';
import { Customer } from '@/lib/mockData';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CustomerDetailClient({ customer }: { customer: Customer }) {
  const router = useRouter();

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <Button variant="ghost" onClick={() => router.back()} style={{ marginBottom: '1rem' }}>← Quay lại</Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>{customer.name}</h1>
        <Badge variant="success">Active</Badge>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <Card title="Thông tin cơ bản">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>NGƯỜI LIÊN HỆ</label>
              <div style={{ fontWeight: 600 }}>{customer.contact_person}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMAIL</label>
              <div>{customer.email}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>SỐ ĐIỆN THOẠI</label>
              <div>{customer.phone}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>PHÂN KHÚC</label>
              <div style={{ marginTop: '0.25rem' }}><Badge variant="info">{customer.segment}</Badge></div>
            </div>
          </div>
        </Card>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Lịch sử tương tác">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Khảo sát kỹ thuật hệ thống bơm vòng dầu</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>15/05/2026 • Bởi Nguyễn Văn A</div>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Gửi báo giá thay thế phụ tùng định kỳ</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10/05/2026 • Bởi Nguyễn Văn A</div>
              </div>
            </div>
          </Card>
          
          <Card title="Sản phẩm quan tâm">
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {customer.interests.map(i => <Badge key={i} variant="neutral">{i}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
