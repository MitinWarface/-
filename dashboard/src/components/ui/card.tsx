import React from 'react';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div className={`bg-white rounded-lg shadow ${className || ''}`} ref={ref} {...props}>
    {children}
  </div>
));
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div className={`mb-4 ${className || ''}`} ref={ref} {...props}>
    {children}
  </div>
));
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <div className={className || ''} ref={ref} {...props}>
    {children}
  </div>
));