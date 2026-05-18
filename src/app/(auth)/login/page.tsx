"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
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

          <h1 className="text-xl font-bold text-slate-900 mb-6 text-center">Đăng nhập hệ thống</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                defaultValue="admin@hctech.vn"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu</label>
              <input 
                type="password" 
                defaultValue="password123"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                required
              />
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                Ghi nhớ tôi
              </label>
              <a href="#" className="text-sm font-semibold text-accent hover:underline">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:bg-opacity-90 transition-colors shadow-md mt-4">
              Đăng nhập (Bypass)
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hoặc</span>
          </div>

          <button onClick={() => router.push('/')} className="mt-6 w-full flex items-center justify-center gap-3 bg-white border border-slate-300 text-slate-700 font-bold py-2.5 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            <Icons.user size={18} />
            Đăng nhập với Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-semibold text-accent hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
