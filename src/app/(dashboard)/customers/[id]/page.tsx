"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Customer, getCustomers, initialCustomers } from '@/lib/mockData';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export async function generateStaticParams() {
  return initialCustomers.map((customer) => ({
    id: customer.id,
  }));
}

export default function CustomerDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getCustomers().then(data => {
      const found = data.find(c => c.id === id);
      setCustomer(found || null);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <div style={{ padding: '2rem' }}><Skeleton height={400} /></div>;
  if (!customer) return <div style={{ padding: '2rem', textAlign: 'center' }}>Không tìm thấy khách hàng</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <Button variant="ghost" onClick={() => router.back()} style={{ marginBottom: '1rem' }}>← Quay lại</Button>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>{customer.name}</h1>
      <Card title="Chi tiết khách hàng">
        <p><strong>Người liên hệ:</strong> {customer.contact_person}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </Card>
    </div>
  );
}
