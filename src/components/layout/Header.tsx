"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ROLES, ROLE_LABELS } from "@/lib/constants";
import type { UserRole } from "@/lib/types";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard":   "Tổng quan",
  "/customers":   "Khách hàng",
  "/opportunities": "Cơ hội bán hàng",
  "/tasks":       "Công việc",
  "/reports":     "Báo cáo & Thống kê",
  "/settings":    "Cài đặt hệ thống",
  "/admin/users": "Quản lý Người dùng",
  "/admin/teams": "Quản lý Nhóm",
};

const ROLE_AVATARS: Record<UserRole, { initials: string; name: string; cls: string }> = {
  admin:       { initials: "QN", name: "Nguyễn Văn Quân",  cls: "avatar-red" },
  team_lead:   { initials: "HT", name: "Trần Thị Hương",   cls: "avatar-blue" },
  sales_staff: { initials: "HP", name: "Phạm Văn Hùng",    cls: "avatar-slate" },
};

const NOTIFS = [
  { icon: "assignment_late", color: "#dc2626", bg: "#fee2e2", text: "11 công việc đang quá hạn cần xử lý", time: "Vừa xong" },
  { icon: "pending_actions",  color: "#d97706", bg: "#fef3c7", text: "2 tài khoản mới chờ phê duyệt",      time: "5 phút trước" },
  { icon: "handshake",        color: "#2563eb", bg: "#dbeafe", text: "Cơ hội \"DHT Pharma Bắc Ninh\" sắp đến hạn báo giá", time: "1 giờ trước" },
  { icon: "check_circle",     color: "#059669", bg: "#d1fae5", text: "BV Chợ Rẫy đã ký hợp đồng bảo trì", time: "Hôm qua" },
];

export default function Header({ pathname }: { pathname: string }) {
  const { role, setRole, customers, opportunities, tasks } = useApp();
  const router = useRouter();
  const [roleOpen,  setRoleOpen]  = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profOpen,  setProfOpen]  = useState(false);
  const [search,    setSearch]    = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const title = Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ?? "HCTECH CRM";
  const av = ROLE_AVATARS[role];

  const closeAll = () => { setRoleOpen(false); setNotifOpen(false); setProfOpen(false); };

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t.closest(".dropdown-anchor")) closeAll();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Global search
  const q = search.trim().toLowerCase();
  const searchResults = q.length < 2 ? [] : [
    ...customers.filter(c => c.name.toLowerCase().includes(q)).slice(0, 3).map(c => ({ type: "customer", label: c.name, sub: "Khách hàng", href: "/customers" })),
    ...opportunities.filter(o => o.title.toLowerCase().includes(q)).slice(0, 3).map(o => ({ type: "opp", label: o.title, sub: o.customerName, href: "/opportunities" })),
    ...tasks.filter(t => t.title.toLowerCase().includes(q)).slice(0, 2).map(t => ({ type: "task", label: t.title, sub: "Công việc", href: "/tasks" })),
  ].slice(0, 6);

  const handleSearchNav = (href: string) => {
    setSearch(""); setSearchFocus(false);
    router.push(href);
  };

  return (
    <header className="app-header">
      {/* Search */}
      <div className="header-search-wrap" style={{ position: "relative" }}>
        <span className="material-symbols-outlined icon-sm header-search-icon">search</span>
        <input
          ref={searchRef}
          className="header-search-input"
          placeholder="Tìm khách hàng, cơ hội, công việc..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setTimeout(() => setSearchFocus(false), 150)}
        />
        {searchFocus && searchResults.length > 0 && (
          <div className="header-search-results">
            {searchResults.map((r, i) => (
              <div key={i} className="header-search-result-item" onMouseDown={() => handleSearchNav(r.href)}>
                <span className="material-symbols-outlined icon-sm" style={{ color: "var(--c-on-variant)" }}>
                  {r.type === "customer" ? "group" : r.type === "opp" ? "handshake" : "assignment_turned_in"}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="truncate" style={{ fontWeight: 600, fontSize: 13 }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: "var(--c-on-variant)" }}>{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {searchFocus && q.length >= 2 && searchResults.length === 0 && (
          <div className="header-search-results">
            <div style={{ padding: "16px", textAlign: "center", color: "var(--c-on-variant)", fontSize: 13 }}>Không tìm thấy kết quả</div>
          </div>
        )}
      </div>

      <div className="header-title">{title}</div>

      <div className="header-right">
        {/* Role switcher */}
        <div style={{ position: "relative" }} className="dropdown-anchor">
          <button className="role-switcher" onClick={() => { closeAll(); setRoleOpen(v => !v); }}>
            <span className="material-symbols-outlined icon-sm">manage_accounts</span>
            <span>Vai trò:</span>
            <strong>{ROLE_LABELS[role]}</strong>
            <span className="material-symbols-outlined icon-sm">{roleOpen ? "expand_less" : "expand_more"}</span>
          </button>
          {roleOpen && (
            <div className="role-dropdown" style={{ right: 0, top: "calc(100% + 8px)", position: "absolute" }}>
              <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--c-on-variant)" }}>
                Demo — chọn vai trò
              </div>
              {ROLES.map(r => (
                <button key={r.id} className={`role-dropdown-item${role === r.id ? " selected" : ""}`}
                  onClick={() => { setRole(r.id as UserRole); setRoleOpen(false); }}>
                  <span className="badge" style={{ background: r.bg, color: r.color }}>{r.label}</span>
                  {role === r.id && <span className="material-symbols-outlined icon-sm" style={{ marginLeft: "auto", color: "var(--c-success)" }}>check</span>}
                </button>
              ))}
              <div style={{ padding: "8px 16px", fontSize: 11, color: "var(--c-on-variant)", borderTop: "1px solid var(--c-outline-variant)" }}>
                Dữ liệu lọc theo quyền của vai trò
              </div>
            </div>
          )}
        </div>

        {/* Notification */}
        <div style={{ position: "relative" }} className="dropdown-anchor">
          <button className="header-icon-btn" onClick={() => { closeAll(); setNotifOpen(v => !v); }}>
            <span className="material-symbols-outlined">notifications</span>
            <span className="notif-dot" />
          </button>
          {notifOpen && (
            <div className="notif-panel" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0 }}>
              <div className="notif-panel-hd">
                <span className="notif-panel-title">Thông báo</span>
                <button style={{ fontSize: 11, color: "var(--c-primary)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setNotifOpen(false)}>Đánh dấu đã đọc</button>
              </div>
              {NOTIFS.map((n, i) => (
                <div key={i} className="notif-item" onClick={() => setNotifOpen(false)}>
                  <div className="notif-item-dot" style={{ backgroundColor: n.bg, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span className="material-symbols-outlined icon-sm icon-fill" style={{ color: n.color }}>{n.icon}</span>
                  </div>
                  <div>
                    <div className="notif-item-text">{n.text}</div>
                    <div className="notif-item-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User profile */}
        <div style={{ position: "relative" }} className="dropdown-anchor">
          <div className="user-chip" onClick={() => { closeAll(); setProfOpen(v => !v); }}>
            <div className="user-info">
              <div className="user-name">{av.name}</div>
              <div className="user-role">{ROLE_LABELS[role]}</div>
            </div>
            <div className={`avatar ${av.cls}`}>{av.initials}</div>
          </div>
          {profOpen && (
            <div className="profile-dropdown" style={{ position: "absolute", top: "calc(100% + 8px)", right: 0 }}>
              <div className="profile-dropdown-hd">
                <div className="profile-dropdown-name">{av.name}</div>
                <div className="profile-dropdown-role">{ROLE_LABELS[role]}</div>
              </div>
              <button className="profile-dropdown-item" onClick={() => { setProfOpen(false); router.push("/settings"); }}>
                <span className="material-symbols-outlined icon-sm">settings</span>Cài đặt
              </button>
              <button className="profile-dropdown-item" onClick={() => { setProfOpen(false); setRoleOpen(true); }}>
                <span className="material-symbols-outlined icon-sm">manage_accounts</span>Đổi vai trò demo
              </button>
              <button className="profile-dropdown-item" onClick={() => setProfOpen(false)}>
                <span className="material-symbols-outlined icon-sm" style={{ color: "var(--c-error)" }}>logout</span>
                <span style={{ color: "var(--c-error)" }}>Đăng xuất</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
