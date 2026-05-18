"use client";
import React from 'react';
import { Icons } from '@/components/icons';

export default function BillingPage() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Quản lý thanh toán</h1>
        <p className="text-sm text-slate-500 mt-1">Theo dõi các giao dịch và hoá đơn hợp đồng.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
          <Icons.dollar size={40} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Module Thanh toán đang được xây dựng</h2>
        <p className="text-slate-500 max-w-md mb-8">
          Chúng tôi đang tích hợp hệ thống thanh toán để giúp bạn quản lý hoá đơn, công nợ dễ dàng hơn trên nền tảng HCTECH CRM.
        </p>
        <button className="bg-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md" onClick={() => alert("Sẽ ra mắt trong phiên bản sau!")}>
          Nhận thông báo khi ra mắt
        </button>
      </div>
    </div>
  );
}
