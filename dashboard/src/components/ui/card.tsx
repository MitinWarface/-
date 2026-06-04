import React from 'react';

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white rounded-lg shadow ${className || ''}`} {...props}>
    {children}
  </div>
);
export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className || ''}`} {...props}>
    {children}
  </div>
);
export const CardContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className || ''} {...props}>
    {children}
  </div>
);