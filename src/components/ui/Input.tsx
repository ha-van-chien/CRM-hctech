import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>{label}</label>}
      <input 
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          borderRadius: 'var(--radius-sm)',
          border: error ? '1px solid var(--error)' : '1px solid var(--border)',
          fontSize: '0.875rem',
          outline: 'none',
          backgroundColor: 'var(--surface)',
          transition: 'all 0.2s ease',
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontSize: '0.75rem', color: 'var(--error)' }}>{error}</span>}
    </div>
  );
};
