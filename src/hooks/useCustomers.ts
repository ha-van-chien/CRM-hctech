import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Customer } from '@/lib/types';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCustomers() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Map snake_case to camelCase
          const mappedCustomers: Customer[] = data.map(c => ({
            id: c.id,
            name: c.name,
            segment: c.segment,
            products: c.products || [],
            phone: c.phone || '',
            email: c.email || '',
            address: c.address || '',
            ownerId: c.owner_id,
            teamId: c.team_id,
            status: c.status,
            notes: c.notes || '',
            createdAt: c.created_at
          }));
          setCustomers(mappedCustomers);
        }
      } catch (err: any) {
        console.error('Error fetching customers:', err);
        setError(err.message || 'Failed to load customers');
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const addCustomer = async (customer: Partial<Customer>) => {
    // Map camelCase to snake_case for Supabase
    const supabaseCustomer = {
      name: customer.name,
      segment: customer.segment,
      products: customer.products,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      owner_id: customer.ownerId,
      team_id: customer.teamId,
      status: customer.status,
      notes: customer.notes
    };

    const { data, error } = await supabase
      .from('customers')
      .insert([supabaseCustomer])
      .select()
      .single();

    if (error) throw error;

    if (data) {
      const newCustomer: Customer = {
        id: data.id,
        name: data.name,
        segment: data.segment,
        products: data.products || [],
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        ownerId: data.owner_id,
        teamId: data.team_id,
        status: data.status,
        notes: data.notes || '',
        createdAt: data.created_at
      };
      setCustomers([newCustomer, ...customers]);
      return newCustomer;
    }
  };

  return { customers, loading, error, addCustomer };
}
