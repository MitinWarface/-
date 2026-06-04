import React from 'react';

export const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className={`bg-white rounded-lg shadow ${className}`} ref={ref} {...props}>
    {children}
  </div>
));
export const CardHeader = ({ className, children, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);
export const CardContent = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);