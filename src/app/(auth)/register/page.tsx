"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend mock bypass
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-pop-in border border-slate-200">
        <div className="p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg text-white">
              <Icons.logo size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              HCTECH <span className="text-accent">CRM</span>
            </span>
          </div>

          <h1 className="text-xl font-bold text-slate-900 mb-6 text-center">Đăng ký tài khoản</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên</label>
              <input 
                type="text" 
                placeholder="Nhập họ và tên"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Nhập email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu</label>
              <input 
                type="password" 
                placeholder="Tạo mật khẩu"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:bg-opacity-90 transition-colors shadow-md mt-4">
              Đăng ký
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
