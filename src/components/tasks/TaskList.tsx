"use client";
import { useState } from "react";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/Button";

interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export default function TaskList({ tasks, onAddTask, onEditTask, onStatusChange }: TaskListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'pending') return t.status !== 'done';
    return t.status === 'done';
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Overdue first
    const aOverdue = new Date(a.dueDate) < new Date() && a.status !== 'done';
    const bOverdue = new Date(b.dueDate) < new Date() && b.status !== 'done';
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // High priority next
    const priorityWeight = { high: 3, medium: 2, low: 1 };
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }

    // Then by date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="task-list-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', padding: '4px', backgroundColor: 'var(--c-surface-low)', borderRadius: 'var(--r-md)' }}>
          <Button 
            variant={filter === 'all' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            Tất cả ({tasks.length})
          </Button>
          <Button 
            variant={filter === 'pending' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('pending')}
          >
            Đang xử lý ({tasks.filter(t => t.status !== 'done').length})
          </Button>
          <Button 
            variant={filter === 'done' ? 'primary' : 'ghost'} 
            size="sm" 
            onClick={() => setFilter('done')}
          >
            Đã xong ({tasks.filter(t => t.status === 'done').length})
          </Button>
        </div>
        
        <Button onClick={onAddTask}>+ Thêm công việc</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sortedTasks.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--c-on-variant)' }}>
            Không có công việc nào trong danh mục này
          </div>
        ) : (
          sortedTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEditTask}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
