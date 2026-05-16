import { initialCustomers } from '@/lib/mockData';
import CustomerDetailClient from './CustomerDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return initialCustomers.map((customer) => ({
    id: customer.id,
  }));
}

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const customer = initialCustomers.find(c => c.id === id);

  if (!customer) {
    notFound();
  }

  return <CustomerDetailClient customer={customer} />;
}
