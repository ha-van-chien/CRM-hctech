import React from 'react';

export const Skeleton = ({ width, height, borderRadius = 'var(--radius-sm)', className = '' }: { width?: string | number, height?: string | number, borderRadius?: string, className?: string }) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width || '100%',
        height: typeof height === 'number' ? `${height}px` : height || '1rem',
        borderRadius
      }}
    />
  );
};

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem' }}>
          <Skeleton height={24} width="20%" />
          <Skeleton height={24} width="30%" />
          <Skeleton height={24} width="15%" />
          <Skeleton height={24} width="20%" />
          <Skeleton height={24} width="15%" />
        </div>
      ))}
    </div>
  );
};
