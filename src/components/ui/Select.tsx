"use client";
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = ({ label, options, error, style, ...props }: SelectProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--c-on-surface)' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        <select 
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            border: error ? '1px solid var(--c-error)' : '1px solid var(--c-outline-variant)',
            fontSize: '0.875rem',
            outline: 'none',
            backgroundColor: 'var(--c-surface)',
            transition: 'all 0.2s ease',
            appearance: 'none',
            cursor: 'pointer',
            ...style
          }}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div style={{ 
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', 
          pointerEvents: 'none', color: 'var(--c-on-variant)', fontSize: '0.75rem' 
        }}>
          ▼
        </div>
      </div>
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--c-error)' }}>{error}</span>}
    </div>
  );
};
