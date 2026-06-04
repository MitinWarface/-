import React from 'react';

export const Switch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, checked, onChange, ...props }, ref) => (
  <input
    type="checkbox"
    className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${className || ''}`}
    ref={ref}
    checked={checked}
    onChange={onChange}
    {...props}
  />
));