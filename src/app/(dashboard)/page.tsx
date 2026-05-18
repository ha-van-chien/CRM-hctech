"use client";
import React, { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Icons } from '@/components/icons';

const COLORS = ['#1E40AF', '#C89A3D', '#059669', '#7c3aed', '#dc2626'];

export default function DashboardPage() {
  const { visibleOpportunities, visibleTasks, visibleCustomers } = useApp();

  // 1. KPI Calculations
  const openOpps = visibleOpportunities.filter(o => o.stage !== 'won' && o.stage !== 'lost');
  const pipelineValue = openOpps.reduce((sum, o) => sum + (o.value || 0), 0);
  
  const todayStr = new Date().toISOString().slice(0, 10);
  const overdueTasks = visibleTasks.filter(t => t.status !== 'done' && t.dueDate < todayStr);
  const pendingTasksCount = visibleTasks.filter(t => t.status !== 'done').length;

  const newOppsCount = visibleOpportunities.filter(o => {
    const d = new Date(o.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 30;
  }).length;

  // 2. Chart Data: Segment Distribution
  const segmentData = useMemo(() => {
    const counts = visibleCustomers.reduce((acc, curr) => {
      acc[curr.segment] = (acc[curr.segment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [
      { name: 'Nhà máy', value: counts['manufacturing'] || 0 },
      { name: 'Thực phẩm', value: counts['food_processing'] || 0 },
      { name: 'Dược phẩm', value: counts['pharmaceutical'] || 0 },
      { name: 'Bệnh viện', value: counts['hospital'] || 0 },
      { name: 'Phòng khám', value: counts['clinic'] || 0 },
    ].filter(i => i.value > 0);
  }, [visibleCustomers]);

  // 3. Chart Data: Pipeline by Month (simplified)
  const barData = [
    { name: 'Tháng 1', value: 120000000 },
    { name: 'Tháng 2', value: 250000000 },
    { name: 'Tháng 3', value: 180000000 },
    { name: 'Tháng 4', value: 340000000 },
    { name: 'Tháng 5', value: pipelineValue }, 
  ];

  // 4. Top 5 Opps
  const topOpps = [...openOpps].sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 5);

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-500 mt-1">Nắm bắt nhanh tình hình kinh doanh và công việc cần xử lý.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard 
          title="Cơ hội đang mở" 
          value={openOpps.length.toString()} 
          icon={<Icons.kanban />} 
          color="bg-blue-100 text-blue-600" 
        />
        <KpiCard 
          title="Tổng giá trị Pipeline" 
          value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pipelineValue)} 
          icon={<Icons.dollar />} 
          color="bg-amber-100 text-accent" 
        />
        <KpiCard 
          title="Công việc quá hạn" 
          value={overdueTasks.length.toString()} 
          subtitle={`${pendingTasksCount} việc đang chờ`}
          icon={<Icons.checkSquare />} 
          color="bg-red-100 text-red-600" 
        />
        <KpiCard 
          title="Cơ hội mới (30 ngày)" 
          value={newOppsCount.toString()} 
          icon={<Icons.users />} 
          color="bg-emerald-100 text-emerald-600" 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-6">Giá trị cơ hội mới theo tháng (6 tháng)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val / 1000000}M`} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <h2 className="text-base font-bold text-slate-800 mb-2">Phân khúc khách hàng</h2>
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={segmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {segmentData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800">Top 5 Cơ hội giá trị cao nhất</h2>
          </div>
          <div className="p-2">
            {topOpps.length > 0 ? topOpps.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="font-semibold text-sm text-slate-900 truncate">{o.title}</div>
                  <div className="text-xs text-slate-500 truncate mt-1">{o.customerName}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm text-accent">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(o.value || 0)}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Dự kiến: {o.dueDate}</div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-slate-500 text-sm">Không có cơ hội nào đang mở.</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-red-600 flex items-center gap-2">
              <Icons.alertCircle />
              Công việc quá hạn cần xử lý
            </h2>
          </div>
          <div className="p-2">
            {overdueTasks.length > 0 ? overdueTasks.map((t) => (
              <div key={t.id} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Icons.checkSquare />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-slate-900">{t.title}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-1">Khách: {t.customerName}</div>
                  <div className="text-xs font-medium text-red-600 mt-1">Hạn: {t.dueDate}</div>
                </div>
              </div>
            )) : (
              <div className="p-8 text-center text-emerald-600 text-sm font-medium flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Icons.checkSquare />
                </div>
                Tuyệt vời! Không có công việc nào quá hạn.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color, subtitle }: { title: string, value: string, icon: React.ReactNode, color: string, subtitle?: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-slate-500 text-sm font-semibold mb-1">{title}</div>
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-2 font-medium">{subtitle}</div>}
    </div>
  );
}
