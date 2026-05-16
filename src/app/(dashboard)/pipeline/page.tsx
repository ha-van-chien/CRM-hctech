"use client";
import React, { useState, useEffect } from 'react';
import { Lead, getLeads, PIPELINE_STAGES } from '@/lib/mockData';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    getLeads().then((data) => {
      setLeads(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Cơ hội Bán hàng</h1>
        <Button onClick={() => toast("Tính năng đang chuẩn bị", "info")}>+ Tạo Cơ hội</Button>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', overflowX: 'auto', flex: 1, paddingBottom: '1.5rem', alignItems: 'flex-start' }}>
        {PIPELINE_STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.stage === stage.id);
          return (
            <div key={stage.id} style={{ flex: '0 0 300px', backgroundColor: '#F1F5F9', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>{stage.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {isLoading ? <Skeleton height={100} /> : stageLeads.map(lead => (
                  <Card key={lead.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedLead(lead)}>
                    <div style={{ fontWeight: 600 }}>{lead.title}</div>
                    <div style={{ color: 'var(--accent)', fontWeight: 700 }}>{new Intl.NumberFormat('vi-VN').format(lead.value)} đ</div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Chi tiết Cơ hội">
        {selectedLead && <div>{selectedLead.title}</div>}
      </Modal>
    </div>
  );
}
