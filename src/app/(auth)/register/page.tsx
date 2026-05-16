"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-main)' }}>
      <Card style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Đăng ký</h1>
        <form onSubmit={(e) => { e.preventDefault(); router.push('/pending/'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input label="Họ tên" required />
          <Input label="Email" type="email" required />
          <Input label="Mật khẩu" type="password" required />
          <Button type="submit">Tạo tài khoản</Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <Link href="/login/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Quay lại đăng nhập</Link>
        </p>
      </Card>
    </div>
  );
}
