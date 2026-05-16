"use client";
import React, { useEffect, useState } from 'react';
import { getCustomers, getLeads } from '@/lib/mockData';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ customers: 0, leads: 0, pipelineValue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const customers = await getCustomers();
      const leads = await getLeads();
      const value = leads.reduce((sum, lead) => sum + lead.value, 0);
      setStats({
        customers: customers.length,
        leads: leads.length,
        pipelineValue: value
      });
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Tổng quan HCTECH CRM</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Khách hàng</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{isLoading ? <Skeleton width={60} height={40} /> : stats.customers}</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cơ hội</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{isLoading ? <Skeleton width={60} height={40} /> : stats.leads}</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Giá trị Pipeline</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{isLoading ? <Skeleton width={150} height={35} /> : `${new Intl.NumberFormat('vi-VN').format(stats.pipelineValue)} đ`}</div>
        </Card>
      </div>
    </div>
  );
}
