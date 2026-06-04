import React from 'react';

export const Loader = React.forwardRef<HTMLElement, { className?: string }>(({ className, ...props }, ref) => (
  <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-primary ${className || ''}`} ref={ref} {...props}>
  </div>
));