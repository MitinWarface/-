import React from 'react';

export const Loader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-primary ${className || ''}`} {...props}>
  </div>
);