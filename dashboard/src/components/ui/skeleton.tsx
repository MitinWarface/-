import React from 'react';

export const Skeleton = ({ className, ...props }) => (
  <div className={`animate-pulse bg-muted ${className}`} {...props}>
  </div>
);