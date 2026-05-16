"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

const NAV_ITEMS = [
  { href: "/dashboard",     icon: "dashboard",           label: "Tổng quan" },
  { href: "/customers",     icon: "group",               label: "Khách hàng" },
  { href: "/opportunities", icon: "handshake",            label: "Cơ hội bán hàng" },
  { href: "/tasks",         icon: "assignment_turned_in", label: "Công việc" },
  { href: "/reports",       icon: "insights",             label: "Báo cáo" },
];

const ADMIN_ITEMS = [
  { href: "/admin/users", icon: "manage_accounts", label: "Người dùng" },
  { href: "/admin/teams", icon: "groups",           label: "Nhóm kinh doanh" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, users, tasks } = useApp();

  const pendingCount = users.filter(u => u.pendingApproval).length;
  const overdueCount = tasks.filter(t => t.status !== "done" && new Date(t.dueDate) < new Date()).length;

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href || pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-inner">
          <div className="sidebar-logo-icon">
            <span className="material-symbols-outlined icon-fill" style={{ fontSize: 20 }}>precision_manufacturing</span>
          </div>
          <div>
            <div className="sidebar-logo-title">HCTECH</div>
            <div className="sidebar-logo-sub">Vacuum Pump CRM</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Quản lý</div>
        {NAV_ITEMS.map(item => (
          <Link key={item.href} href={item.href} className={`nav-item${isActive(item.href) ? " active" : ""}`}>
            <span className="material-symbols-outlined icon-sm">{item.icon}</span>
            {item.label}
            {item.href === "/tasks" && overdueCount > 0 && (
              <span className="nav-badge">{overdueCount}</span>
            )}
          </Link>
        ))}

        {role === "admin" && (
          <>
            <div className="nav-label" style={{ marginTop: 8 }}>Quản trị</div>
            {ADMIN_ITEMS.map(item => (
              <Link key={item.href} href={item.href} className={`nav-item${isActive(item.href) ? " active" : ""}`}>
                <span className="material-symbols-outlined icon-sm">{item.icon}</span>
                {item.label}
                {item.href === "/admin/users" && pendingCount > 0 && (
                  <span className="nav-badge">{pendingCount}</span>
                )}
              </Link>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <Link href="/settings" className={`nav-item${isActive("/settings") ? " active" : ""}`}>
          <span className="material-symbols-outlined icon-sm">settings</span>
          Cài đặt
        </Link>
        <div style={{ padding: "8px 10px", fontSize: 10, color: "rgba(255,255,255,.3)", fontWeight: 500, letterSpacing: ".04em" }}>
          HCTECH CRM v1.0 · 2024
        </div>
      </div>
    </aside>
  );
}
