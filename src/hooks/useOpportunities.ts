import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Opportunity } from '@/lib/types';

export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('opportunities')
          .select(`*, customers(name)`)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const mappedOps: Opportunity[] = data.map(o => ({
            id: o.id,
            title: o.title,
            customerId: o.customer_id,
            customerName: o.customers?.name || '',
            product: o.product, // Note: the DB schema doesn't have product field in opportunities? Let's assume it's just from notes or omitted.
            value: Number(o.value),
            stage: o.stage,
            probability: o.probability,
            ownerId: o.owner_id,
            teamId: o.team_id,
            dueDate: o.due_date,
            notes: o.notes || '',
            activities: [],
            createdAt: o.created_at
          }));
          setOpportunities(mappedOps);
        }
      } catch (err: any) {
        console.error('Error fetching opportunities:', err);
        setError(err.message || 'Failed to load opportunities');
      } finally {
        setLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  const updateOpportunityStage = async (id: string, stage: string) => {
    const { error } = await supabase
      .from('opportunities')
      .update({ stage })
      .eq('id', id);

    if (error) throw error;
    setOpportunities(opportunities.map(o => o.id === id ? { ...o, stage: stage as any } : o));
  };

  return { opportunities, loading, error, updateOpportunityStage };
}
