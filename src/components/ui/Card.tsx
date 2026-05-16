import React from 'react';

export const Card = ({ children, className = '', title, subtitle }: { children: React.ReactNode, className?: string, title?: string, subtitle?: string }) => {
  return (
    <div className="card-premium" style={{ 
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)',
      ... (className ? {} : {}) // placeholder for extension
    }}>
      {title && (
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'info' }: { children: React.ReactNode, variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral' }) => {
  const colors = {
    info: { bg: '#E0F2FE', text: '#0369A1' },
    success: { bg: '#DCFCE7', text: '#15803D' },
    warning: { bg: '#FEF3C7', text: '#92400E' },
    error: { bg: '#FEE2E2', text: '#B91C1C' },
    neutral: { bg: '#F1F5F9', text: '#475569' }
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.625rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
      backgroundColor: colors[variant].bg,
      color: colors[variant].text
    }}>
      {children}
    </span>
  );
};
