"use client";
import { useState } from "react";
import { Task } from "@/lib/types";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function TasksPage() {
  const { visibleTasks, addTask, updateTask, updateTask: updateTaskStatus } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const handleOpenAdd = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Task>) => {
    try {
      if (editingTask) {
        updateTask(editingTask.id, data);
        toast("Đã cập nhật công việc", "success");
      } else {
        addTask(data as any);
        toast("Đã tạo công việc mới", "success");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast(error.message || "Có lỗi xảy ra", "error");
    }
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      updateTask(id, { status });
      toast(status === 'done' ? "Đã hoàn thành công việc" : "Đã chuyển trạng thái", "success");
    } catch (error: any) {
      toast(error.message || "Có lỗi xảy ra", "error");
    }
  };

  return (
    <div className="animate-fade-in max-w-[1400px] mx-auto">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 700, 
          letterSpacing: '-0.02em',
          color: 'var(--c-on-surface)',
          marginBottom: '0.5rem'
        }}>
          Quản lý công việc
        </h1>
        <p style={{ color: 'var(--c-on-variant)', fontSize: '0.9375rem' }}>
          Theo dõi và thực hiện các hoạt động kinh doanh hàng ngày.
        </p>
      </header>

      <TaskList 
        tasks={visibleTasks} 
        onAddTask={handleOpenAdd}
        onEditTask={handleOpenEdit}
        onStatusChange={handleStatusChange}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? "Chỉnh sửa công việc" : "Thêm công việc mới"}
      >
        <TaskForm 
          initialTask={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
