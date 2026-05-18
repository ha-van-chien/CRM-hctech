"use client";
import { useState, useEffect } from "react";
import { Task, TaskPriority, TaskType } from "@/lib/types";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { INITIAL_CUSTOMERS, INITIAL_OPPORTUNITIES } from "@/lib/mock-data";

interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
}

export default function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    type: "call",
    priority: "medium",
    status: "pending",
    dueDate: new Date().toISOString().split('T')[0],
    customerId: "",
    opportunityId: "",
    notes: ""
  });

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Input 
        label="Tiêu đề công việc"
        placeholder="Ví dụ: Gọi điện báo giá cho KH..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Select 
          label="Loại công việc"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as TaskType })}
          options={[
            { value: 'call', label: 'Gọi điện' },
            { value: 'meeting', label: 'Họp' },
            { value: 'email', label: 'Email' },
            { value: 'visit', label: 'Thăm trực tiếp' },
            { value: 'task', label: 'Khác' }
          ]}
        />
        <Select 
          label="Mức độ ưu tiên"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
          options={[
            { value: 'high', label: 'Cao (Quan trọng)' },
            { value: 'medium', label: 'Trung bình' },
            { value: 'low', label: 'Thấp' }
          ]}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Input 
          label="Hạn hoàn thành"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          required
        />
        <Select 
          label="Trạng thái"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
          options={[
            { value: 'pending', label: 'Chờ xử lý' },
            { value: 'in_progress', label: 'Đang làm' },
            { value: 'done', label: 'Hoàn thành' },
            { value: 'overdue', label: 'Quá hạn' }
          ]}
        />
      </div>

      <Select 
        label="Khách hàng liên quan"
        value={formData.customerId || ""}
        onChange={(e) => {
          const cust = INITIAL_CUSTOMERS.find(c => c.id === e.target.value);
          setFormData({ ...formData, customerId: e.target.value, customerName: cust?.name || "" });
        }}
        options={[
          { value: '', label: '-- Không chọn --' },
          ...INITIAL_CUSTOMERS.map(c => ({ value: c.id, label: c.name }))
        ]}
      />

      <Select 
        label="Cơ hội (Pipeline)"
        value={formData.opportunityId || ""}
        onChange={(e) => {
          const opp = INITIAL_OPPORTUNITIES.find(o => o.id === e.target.value);
          setFormData({ ...formData, opportunityId: e.target.value, opportunityTitle: opp?.title || "" });
        }}
        options={[
          { value: '', label: '-- Không chọn --' },
          ...INITIAL_OPPORTUNITIES.map(o => ({ value: o.id, label: o.title }))
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Ghi chú</label>
        <textarea 
          rows={3}
          style={{
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--c-outline-variant)',
            fontSize: '0.875rem',
            outline: 'none',
            resize: 'none'
          }}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
        <Button variant="ghost" type="button" onClick={onCancel}>Hủy</Button>
        <Button type="submit">{initialTask ? "Cập nhật" : "Tạo mới"}</Button>
      </div>
    </form>
  );
}
