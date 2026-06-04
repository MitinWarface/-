import React from 'react';

export const Button = React.forwardRef(({ variant = 'default', size = 'default', children, className, onClick, ...props }, ref) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  // Variants
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  }[variant];
  // Sizes
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 rounded-md',
    lg: 'h-11 px-8 rounded-md',
    icon: 'h-10 w-10',
  }[size];
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      ref={ref}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

export const UseFormSetError = () => {};