"use client";
import { usePathname } from "next/navigation";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AppProvider>
      <div className="app-shell">
        <Sidebar />
        <div className="main-wrap">
          <Header pathname={pathname} />
          <main className="page-content">
            <div className="page-inner animate-in">{children}</div>
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
