"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tổng quan', href: '/', icon: Icons.dashboard },
    { name: 'Cơ hội bán hàng', href: '/pipeline', icon: Icons.kanban },
    { name: 'Công việc', href: '/tasks', icon: Icons.checkSquare },
    { name: 'Danh sách khách hàng', href: '/customers', icon: Icons.users },
  ];

  const adminItems = [
    { name: 'Thanh toán', href: '/billing', icon: Icons.pieChart },
    { name: 'Cài đặt hệ thống', href: '/settings', icon: Icons.settings },
  ];

  const renderLink = (item: any) => {
    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
    return (
      <Link 
        key={item.href} 
        href={item.href}
        className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm transition-all duration-200
          ${isActive 
            ? 'bg-white/10 text-white font-semibold border-l-4 border-accent' 
            : 'text-white/70 font-medium border-l-4 border-transparent hover:bg-white/5 hover:text-white'
          }`}
      >
        <span className={`${isActive ? 'text-accent' : 'text-current'}`}>
          {item.icon()}
        </span>
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="w-[260px] bg-dark text-white flex flex-col h-screen sticky top-0 z-50 shadow-2xl shrink-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
          <Icons.logo />
        </div>
        <span className="text-xl font-bold tracking-tight">
          HCTECH <span className="text-accent">CRM</span>
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-5 pt-4 pb-2">Menu chính</p>
        {navItems.map(renderLink)}
        
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 px-5 pt-8 pb-2">Quản trị viên</p>
        {adminItems.map(renderLink)}
      </div>

      {/* Footer / Logout */}
      <div className="p-6 border-t border-white/10">
        <Link 
          href="/login"
          className="flex items-center gap-4 px-5 py-3 rounded-xl text-white/70 text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <Icons.logout />
          Đăng xuất
        </Link>
      </div>
    </aside>
  );
}
