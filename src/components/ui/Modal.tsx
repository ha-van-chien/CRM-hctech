"use client";
import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        <div style={{ 
          padding: '1.25rem 1.5rem', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
        </div>
        
        <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
          {children}
        </div>
        
        <div style={{ 
          padding: '1.25rem 1.5rem', 
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem'
        }}>
          {footer || (
            <>
              <Button variant="outline" onClick={onClose}>Hủy</Button>
              <Button onClick={onClose}>Xác nhận</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
