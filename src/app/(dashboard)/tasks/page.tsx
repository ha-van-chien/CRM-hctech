"use client";
import React from 'react';
import { Card, Badge } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export default function TasksPage() {
  const { toast } = useToast();
  const tasks = [
    { id: 1, title: 'Gọi điện xác nhận lịch khảo sát - Vinmec', deadline: 'Hôm nay', priority: 'high' },
    { id: 2, title: 'Gửi báo giá máy bơm khô - Dược Hậu Giang', deadline: 'Ngày mai', priority: 'medium' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '2rem' }}>Công việc</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {tasks.map(task => (
          <Card key={task.id} onClick={() => toast("Đã hoàn thành!", "success")} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{task.title}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Hạn: {task.deadline}</div>
              </div>
              <Badge variant={task.priority === 'high' ? 'error' : 'warning'}>Ưu tiên {task.priority}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
