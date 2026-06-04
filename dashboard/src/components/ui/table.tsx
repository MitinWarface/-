import React from 'react';

export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={`w-full text-sm text-left rtl:text-right border-collapse ${className || ''}`} {...props}>
    {props.children}
  </table>
);
export const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableHeadElement>) => (
  <thead className={className || ''} {...props}>
    {props.children}
  </thead>
);
export const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableBodyElement>) => (
  <tbody className={className || ''} {...props}>
    {props.children}
  </tbody>
);
export const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={`border-b ${className || ''}`} {...props}>
    {props.children}
  </tr>
);
export const TableHead = ({ className, ...props }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground/50 uppercase ${className || ''}`} {...props}>
    {props.children}
  </th>
);
export const TableCell = ({ className, ...props }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
  <td className={`px-6 py-4 ${className || ''}`} {...props}>
    {props.children}
  </td>
);