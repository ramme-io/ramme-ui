"use client";

import React, { useState } from 'react';
import { Card } from '../layout/Card';
import { Drawer } from '../layout/Drawer';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Menu, MenuItem } from '../navigation/Menu';
import { Table, TableHeader } from '../data-display/Table';

export interface ChartWithTableProps {
  /** The title of the chart. */
  title: string;
  /** The chart component to be displayed. */
  children: React.ReactNode;
  /** The data used by the chart, which will be displayed in the table. */
  data: any[];
  /** The header configuration for the data table. */
  tableHeaders: TableHeader[];
}

/**
 * @wizard
 * @name ChartWithTable
 * @description A wrapper component that combines a chart with an option to view its underlying data in a table within a drawer.
 * @tags templates, charts, data-display, pattern, dashboard
 * @props
 * - name: title
 * type: string
 * description: The title displayed at the top of the chart card.
 * - name: children
 * type: React.ReactNode
 * description: The chart component itself (e.g., <BarChart />, <LineChart />).
 * - name: data
 * type: any[]
 * description: The raw data array used to render the chart and the table view.
 * - name: tableHeaders
 * type: TableHeader[]
 * description: The column definitions for the table view.
 * @category templates-patterns
 */
export const ChartWithTable: React.FC<ChartWithTableProps> = ({ title, children, data, tableHeaders }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    // FIX: Replaced the `padding` prop with the `className` prop.
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* FIX: Replaced `text-text` with theme-aware `text-foreground`. */}
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        <Menu
          trigger={
            <Button variant="ghost" size="sm"><Icon name="more-horizontal" /></Button>
          }
          position="bottom-right"
        >
          <MenuItem onClick={() => setIsDrawerOpen(true)}>
            <Icon name="table" size={16} className="mr-2" />
            View as table
          </MenuItem>
          <MenuItem>
            <Icon name="download" size={16} className="mr-2" />
            Download as CSV
          </MenuItem>
        </Menu>
      </div>

      <div className="h-96">
        {children}
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="right"
        size="50%"
        title={`Data for: ${title}`}
      >
        <div className="p-4">
          <Table headers={tableHeaders} data={data} />
        </div>
      </Drawer>
    </Card>
  );
};