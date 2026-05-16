import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-sm",
    secondary: "bg-[#DC2626] text-white hover:bg-[#B91C1C] shadow-sm",
    outline: "border border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]",
    ghost: "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]",
    danger: "bg-[#EF4444] text-white hover:bg-[#DC2626]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  // Inline fallback styles since we are avoiding Tailwind for core but using it as reference
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    borderRadius: 'var(--radius-sm)',
    fontSize: size === 'sm' ? '0.75rem' : size === 'lg' ? '1rem' : '0.875rem',
    padding: size === 'sm' ? '0.5rem 0.75rem' : size === 'lg' ? '1rem 1.5rem' : '0.625rem 1.25rem',
    cursor: props.disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: props.disabled || isLoading ? 0.6 : 1,
    border: variant === 'outline' ? '1px solid var(--border)' : 'none',
    backgroundColor: variant === 'primary' ? 'var(--primary)' : 
                     variant === 'secondary' ? 'var(--accent)' : 
                     variant === 'danger' ? 'var(--error)' : 
                     variant === 'ghost' ? 'transparent' : 'white',
    color: variant === 'outline' || variant === 'ghost' ? 'var(--text-main)' : 'white',
    boxShadow: variant === 'ghost' ? 'none' : 'var(--shadow-sm)'
  };

  return (
    <button style={style} {...props}>
      {isLoading ? (
        <span style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}>↻</span>
      ) : null}
      {children}
    </button>
  );
};
