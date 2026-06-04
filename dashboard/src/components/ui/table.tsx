import React from 'react';

export const Table = ({ className, children, ...props }) => (
  <table className={`w-full text-sm text-left rtl:text-right border-collapse ${className}`} {...props}>
    {children}
  </table>
);
export const TableHeader = ({ className, children, ...props }) => (
  <thead className={className} {...props}>
    {children}
  </thead>
);
export const TableBody = ({ className, children, ...props }) => (
  <tbody className={className} {...props}>
    {children}
  </tbody>
);
export const TableRow = ({ className, children, ...props }) => (
  <tr className={`border-b ${className}`} {...props}>
    {children}
  </tr>
);
export const TableHead = ({ className, children, ...props }) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground/50 uppercase ${className}`} {...props}>
    {children}
  </th>
);
export const TableCell = ({ className, children, ...props }) => (
  <td className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </td>
);