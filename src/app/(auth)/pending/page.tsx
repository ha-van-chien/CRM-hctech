"use client";
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function PendingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
      <Card style={{ width: '100%', maxWidth: '500px', padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Tài khoản đang chờ duyệt</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Vui lòng chờ Admin phê duyệt.</p>
        <Link href="/login/"><Button variant="outline">Quay lại</Button></Link>
      </Card>
    </div>
  );
}
