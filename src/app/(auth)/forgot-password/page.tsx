"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

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

          <h1 className="text-xl font-bold text-slate-900 mb-2 text-center">Khôi phục mật khẩu</h1>
          <p className="text-sm text-slate-500 text-center mb-6">
            Nhập email của bạn và chúng tôi sẽ gửi đường dẫn đặt lại mật khẩu.
          </p>

          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="Nhập email đã đăng ký..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  required
                />
              </div>

              <button type="submit" className="w-full bg-accent text-white font-bold py-2.5 rounded-lg hover:bg-opacity-90 transition-colors shadow-md mt-4">
                Gửi yêu cầu
              </button>
            </form>
          ) : (
            <div className="text-center bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icons.check size={24} />
              </div>
              <h3 className="text-emerald-800 font-bold mb-1">Đã gửi email xác nhận</h3>
              <p className="text-emerald-600 text-sm">Vui lòng kiểm tra hộp thư đến của bạn để đổi mật khẩu mới.</p>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-accent transition-colors">
              <Icons.arrowLeft size={16} />
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
