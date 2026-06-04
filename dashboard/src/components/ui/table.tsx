import React from 'react';

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table className={`w-full text-sm text-left rtl:text-right border-collapse ${className || ''}`} ref={ref} {...props}>
    {props.children}
  </table>
));
export const TableHeader = React.forwardRef<HTMLTableHeadElement, React.HTMLAttributes<HTMLTableHeadElement>>(({ className, ...props }, ref) => (
  <thead className={className || ''} ref={ref} {...props}>
    {props.children}
  </thead>
));
export const TableBody = React.forwardRef<HTMLTableBodyElement, React.HTMLAttributes<HTMLTableBodyElement>>(({ className, ...props }, ref) => (
  <tbody className={className || ''} ref={ref} {...props}>
    {props.children}
  </tbody>
));
export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr className={`border-b ${className || ''}`} ref={ref} {...props}>
    {props.children}
  </tr>
));
export const TableHead = React.forwardRef<HTMLTableHeaderCellElement, React.HTMLAttributes<HTMLTableHeaderCellElement>>(({ className, ...props }, ref) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground/50 uppercase ${className || ''}`} ref={ref} {...props}>
    {props.children}
  </th>
));
export const TableCell = React.forwardRef<HTMLTableDataCellElement, React.HTMLAttributes<HTMLTableDataCellElement>>(({ className, ...props }, ref) => (
  <td className={`px-6 py-4 ${className || ''}`} ref={ref} {...props}>
    {props.children}
  </td>
));