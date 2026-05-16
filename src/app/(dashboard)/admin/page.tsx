"use client";
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function AdminPage() {
  const { toast } = useToast();
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Quản trị hệ thống</h1>
      <Card title="Phê duyệt người dùng">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600 }}>Trần Minh Quân</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>quan.tm@hctech.vn</div>
          </div>
          <Button size="sm" onClick={() => toast("Đã phê duyệt!", "success")}>Phê duyệt</Button>
        </div>
      </Card>
    </div>
  );
}
