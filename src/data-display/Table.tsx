// packages/ui/src/data-display/Table.tsx
"use client";

import React from 'react';
import { EmptyState } from '../feedback/EmptyState';

// Exporting the type so it can be used in other components like ChartWithTable
export interface TableHeader {
  key: string;
  label:string;
  render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

export interface TableProps {
  headers: TableHeader[];
  data: Record<string, any>[];
  caption?: string;
  className?: string;
}

/**
 * @wizard
 * @name Table
 * @description A simple, theme-aware HTML table component for displaying tabular data, with support for custom cell rendering and empty states.
 * @tags data-display, table, ui
 * @props
 * - name: headers
 * type: "{ key: string; label: string; render?: (value: any, row: Record<string, any>) => React.ReactNode; }[]"
 * description: An array defining the table columns, including a `key`, `label`, and optional `render` function for custom cell content.
 * - name: data
 * type: "Record<string, any>[]"
 * description: An array of objects, where each object represents a row of data for the table.
 * - name: caption
 * type: string
 * description: An optional caption for the table, providing a title or summary.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the table container.
 * @category data-display
 */
export const Table: React.FC<TableProps> = ({ headers, data, caption, className }) => {
  return (
    <div className={`overflow-x-auto rounded-lg border border-border ${className || ''}`}>
      <table className="w-full text-left">
        {caption && <caption className="p-4 text-lg font-semibold text-text bg-card-alt">{caption}</caption>}
        <thead className="bg-card-alt">
          <tr>
            {headers.map((header) => (
              <th key={header.key} scope="col" className="p-4 text-sm font-semibold text-text whitespace-nowrap">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-primary/5 transition-colors">
                {headers.map((header) => {
                  const value = row[header.key];
                  return (
                    <td key={header.key} className="p-4 text-sm text-text-light whitespace-nowrap">
                      {header.render ? header.render(value, row) : String(value)}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>
                <div className="p-8 flex justify-center items-center">
                   <EmptyState
                    title="No Data Available"
                    description="There is no data to display in this table."
                    icon="table"
                  />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};