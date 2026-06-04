import React from 'react';

export const Skeleton = React.forwardRef<HTMLElement, { className?: string }>(({ className, ...props }, ref) => (
  <div className={`animate-pulse bg-muted ${className || ''}`} ref={ref} {...props}>
  </div>
));