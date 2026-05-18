import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Task } from '@/lib/types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        // We'll also fetch related customer name and opportunity title if needed, 
        // but for now let's just select the flat task structure.
        const { data, error } = await supabase
          .from('tasks')
          .select(`
            *,
            customers ( name ),
            opportunities ( title )
          `)
          .order('due_date', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          const mappedTasks: Task[] = data.map(t => ({
            id: t.id,
            title: t.title,
            type: t.type,
            status: t.status,
            priority: t.priority,
            customerId: t.customer_id,
            customerName: t.customers?.name || null,
            opportunityId: t.opportunity_id,
            opportunityTitle: t.opportunities?.title || null,
            assigneeId: t.assignee_id,
            dueDate: t.due_date,
            notes: t.notes || '',
            createdAt: t.created_at
          }));
          setTasks(mappedTasks);
        }
      } catch (err: any) {
        console.error('Error fetching tasks:', err);
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  const addTask = async (task: Partial<Task>) => {
    const supabaseTask = {
      title: task.title,
      type: task.type,
      status: task.status,
      priority: task.priority,
      customer_id: task.customerId,
      opportunity_id: task.opportunityId,
      assignee_id: task.assigneeId,
      due_date: task.dueDate,
      notes: task.notes
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([supabaseTask])
      .select()
      .single();

    if (error) throw error;

    if (data) {
      const newTask: Task = {
        id: data.id,
        title: data.title,
        type: data.type,
        status: data.status,
        priority: data.priority,
        customerId: data.customer_id,
        customerName: null, // would need to be passed in or re-fetched
        opportunityId: data.opportunity_id,
        opportunityTitle: null,
        assigneeId: data.assignee_id,
        dueDate: data.due_date,
        notes: data.notes || '',
        createdAt: data.created_at
      };
      setTasks([...tasks, newTask]);
      return newTask;
    }
  };

  const updateTaskStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    
    setTasks(tasks.map(t => t.id === id ? { ...t, status: status as any } : t));
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const supabaseUpdates = {
      title: updates.title,
      type: updates.type,
      status: updates.status,
      priority: updates.priority,
      customer_id: updates.customerId,
      opportunity_id: updates.opportunityId,
      assignee_id: updates.assigneeId,
      due_date: updates.dueDate,
      notes: updates.notes
    };

    const { error } = await supabase
      .from('tasks')
      .update(supabaseUpdates)
      .eq('id', id);

    if (error) throw error;

    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } as Task : t));
  };

  return { tasks, loading, error, addTask, updateTaskStatus, updateTask };
}
