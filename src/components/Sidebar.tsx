"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Tổng quan', href: '/', icon: Icons.dashboard },
    { name: 'Khách hàng', href: '/customers', icon: Icons.users },
    { name: 'Cơ hội (Pipeline)', href: '/pipeline', icon: Icons.kanban },
    { name: 'Công việc', href: '/tasks', icon: Icons.checkSquare },
  ];

  const adminItems = [
    { name: 'Quản trị hệ thống', href: '/admin', icon: Icons.settings },
  ];

  const renderLink = (item: any) => {
    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
    return (
      <Link 
        key={item.href} 
        href={item.href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
          color: isActive ? 'white' : 'rgba(255,255,255,0.85)',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.9375rem',
          transition: 'all 0.2s ease',
          borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
        }}
        className="sidebar-link"
      >
        <span style={{ color: isActive ? 'var(--accent)' : 'inherit' }}>{item.icon()}</span>
        {item.name}
      </Link>
    );
  };

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      backgroundColor: 'var(--bg-sidebar)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{ 
          width: '32px', height: '32px', backgroundColor: 'var(--accent)', 
          borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Icons.logo />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.04em', fontFamily: 'var(--font-heading)' }}>
          HCTECH <span style={{ color: 'var(--accent)' }}>CRM</span>
        </span>
      </div>

      <div style={{ flex: 1, padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', padding: '1rem 1.25rem' }}>Menu chính</p>
        {navItems.map(renderLink)}
        
        <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', padding: '2rem 1.25rem 1rem' }}>Cài đặt & Quản trị</p>
        {adminItems.map(renderLink)}
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link 
          href="/login"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
          className="sidebar-link"
        >
          <Icons.logout />
          Đăng xuất
        </Link>
      </div>

      <style jsx>{`
        :global(.sidebar-link):hover {
          background-color: rgba(255,255,255,0.05) !important;
          color: white !important;
        }
      `}</style>
    </aside>
  );
}
