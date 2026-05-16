"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
        <Header />
        <main style={{ padding: '2rem 2.5rem', flex: 1 }} className="animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
