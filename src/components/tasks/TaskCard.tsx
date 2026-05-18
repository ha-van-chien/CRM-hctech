"use client";
import { Task, TaskPriority } from "@/lib/types";
import { Badge, Card } from "@/components/ui/Card";
import { Icons } from "@/components/icons";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

export default function TaskCard({ task, onEdit, onStatusChange }: TaskCardProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  
  const priorityColors: Record<TaskPriority, "error" | "warning" | "success" | "neutral"> = {
    high: "error",
    medium: "warning",
    low: "success"
  };

  const typeIcons = {
    call: Icons.phone,
    meeting: Icons.users,
    email: Icons.mail,
    task: Icons.checkSquare,
    visit: Icons.mapPin
  };

  const Icon = typeIcons[task.type] || Icons.checkSquare;

  return (
    <Card 
      onClick={() => onEdit?.(task)}
      className="task-card-premium"
      style={{
        padding: '1rem',
        marginBottom: '0.75rem',
        borderLeft: isOverdue ? '4px solid var(--c-error)' : `4px solid var(--c-${priorityColors[task.priority]})`
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange?.(task.id, task.status === 'done' ? 'pending' : 'done');
          }}
          style={{
            marginTop: '0.25rem',
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '4px',
            border: `2px solid ${task.status === 'done' ? 'var(--c-success)' : 'var(--c-outline)'}`,
            backgroundColor: task.status === 'done' ? 'var(--c-success)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          {task.status === 'done' && <span style={{ color: 'white', fontSize: '0.75rem' }}>✓</span>}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h4 style={{ 
              fontSize: '0.9375rem', 
              fontWeight: 600,
              textDecoration: task.status === 'done' ? 'line-through' : 'none',
              color: task.status === 'done' ? 'var(--c-on-variant)' : 'var(--c-on-surface)'
            }}>
              {task.title}
            </h4>
            <Badge variant={priorityColors[task.priority]}>
              {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
            </Badge>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8125rem', color: 'var(--c-on-variant)', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Icon size={14} />
              {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
            </span>
            
            {task.customerName && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Icons.user size={14} />
                {task.customerName}
              </span>
            )}

            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.375rem',
              color: isOverdue ? 'var(--c-error)' : 'inherit',
              fontWeight: isOverdue ? 600 : 400
            }}>
              <Icons.calendar size={14} />
              {new Date(task.dueDate).toLocaleDateString('vi-VN')}
              {isOverdue && ' (Quá hạn)'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
