import React from 'react';

export const LineChart = React.forwardRef<HTMLDivElement, { className?: string; data?: any }>(({ className, data, ...props }, ref) => (
  <div className={`h-64 w-full bg-muted ${className || ''}`} ref={ref} {...props}>
    {/* Placeholder for line chart */}
  </div>
));