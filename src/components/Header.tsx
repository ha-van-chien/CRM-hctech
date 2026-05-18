"use client";
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Icons } from './icons';

const ROLE_LABELS = {
  admin: "Quản trị viên",
  team_lead: "Trưởng nhóm",
  sales_staff: "Nhân viên kinh doanh"
};

export default function Header() {
  const { role, setRole } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-96">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icons.search />
        </div>
        <input 
          type="text" 
          placeholder="Tìm kiếm khách hàng, cơ hội, công việc..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-accent transition-colors"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Role Switcher (Mock Feature) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            className="text-sm bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 outline-none focus:border-accent cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="team_lead">Trưởng nhóm</option>
            <option value="sales_staff">Nhân viên kinh doanh</option>
          </select>
        </div>

        {/* Notifications & Tasks */}
        <div className="flex gap-2">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors relative"
            >
              <Icons.bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 py-4 px-2 z-50 animate-pop-in">
                <div className="px-4 pb-2 border-b border-slate-100 mb-2 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800">Thông báo</h3>
                  <span className="text-xs font-semibold text-accent cursor-pointer">Đánh dấu đã đọc</span>
                </div>
                <div className="px-2 py-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">Khách hàng mới: Vinalink Group</p>
                  <p className="text-xs text-slate-500 mt-1">Vừa xong</p>
                </div>
                <div className="px-2 py-3 hover:bg-slate-50 rounded-xl cursor-pointer">
                  <p className="text-sm text-slate-800 font-medium">Cơ hội "Dự án y tế" được chuyển sang Báo giá</p>
                  <p className="text-xs text-slate-500 mt-1">2 giờ trước</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* User Profile */}
        <div className="relative flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800 leading-tight">Admin User</div>
            <div className="text-xs font-medium text-slate-500">{ROLE_LABELS[role as keyof typeof ROLE_LABELS] || 'Người dùng'}</div>
          </div>
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-yellow-200 text-white flex items-center justify-center font-bold shadow-md shadow-accent/20 border-2 border-white cursor-pointer hover:scale-105 transition-transform"
          >
            A
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-pop-in">
              <a href="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-accent font-medium transition-colors">Cài đặt tài khoản</a>
              <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors border-t border-slate-100 mt-1">Đăng xuất</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
