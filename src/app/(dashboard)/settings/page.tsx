"use client";
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();

  const handleSave = () => {
    toast("Cài đặt đã được lưu thành công", "success");
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Cài đặt hệ thống</h1>
        <p className="text-sm text-slate-500 mt-1">Cấu hình thông tin công ty và quản lý thành viên.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button 
            onClick={() => setActiveTab('general')}
            className={`px-6 py-4 font-semibold transition-colors ${activeTab === 'general' ? 'text-accent border-b-2 border-accent bg-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Thông tin chung
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`px-6 py-4 font-semibold transition-colors ${activeTab === 'team' ? 'text-accent border-b-2 border-accent bg-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Thành viên
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 font-semibold transition-colors ${activeTab === 'security' ? 'text-accent border-b-2 border-accent bg-white' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Bảo mật
          </button>
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto bg-white">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tên công ty</label>
                <input 
                  type="text" 
                  defaultValue="HCTECH Vietnam" 
                  className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email hỗ trợ</label>
                <input 
                  type="email" 
                  defaultValue="support@hctech.vn" 
                  className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div className="pt-6">
                <button onClick={handleSave} className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
                  <Icons.check size={18} /> Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Danh sách nhân viên</h3>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors text-sm">
                  + Thêm thành viên
                </button>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold mr-4">A</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">Admin User</p>
                    <p className="text-xs text-slate-500">admin@hctech.vn</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-xs font-semibold">Quản trị viên</span>
                </div>
                <div className="flex items-center p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4">T</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">Tran Team Lead</p>
                    <p className="text-xs text-slate-500">lead@hctech.vn</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-semibold">Trưởng nhóm</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="font-bold text-amber-800 mb-1">Xác thực 2 yếu tố (2FA)</h3>
                <p className="text-sm text-amber-700 mb-3">Tăng cường bảo mật cho tài khoản của bạn bằng cách yêu cầu mã xác nhận khi đăng nhập.</p>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors">Bật 2FA</button>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-4">Đổi mật khẩu</h3>
                <div className="space-y-4 max-w-md">
                  <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent" />
                  <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-accent" />
                  <button onClick={handleSave} className="bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-900 transition-colors">Lưu mật khẩu mới</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
