// packages/ui/src/data-display/DataTable.tsx
"use client";

import React, { useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { 
  type ColDef
} from 'ag-grid-community';
import 'ag-grid-enterprise';

export interface DataTableProps extends AgGridReactProps {
  height?: string;
}

/**
 * @wizard
 * @name DataTable
 * @description A powerful data grid component that wraps AG Grid, providing advanced features like sorting, filtering, and resizing, fully themed to match the application.
 * @tags data-display, grid, table, ag-grid, advanced
 * @props
 * - name: rowData
 * type: any[]
 * description: The data to display in the grid, an array of row objects.
 * - name: columnDefs
 * type: ColDef[]
 * description: An array defining the columns of the grid, using AG Grid's `ColDef` structure.
 * - name: height
 * type: string
 * description: The height of the data table container (e.g., '500px', '100%').
 * default: '500px'
 * - name: defaultColDef
 * type: ColDef
 * description: Default column definitions applied to all columns unless overridden.
 * - name: gridOptions
 * type: GridOptions
 * description: Additional AG Grid options to configure the grid's behavior.
 * @category data-display
 */
export const DataTable: React.FC<DataTableProps> = ({
  height = '500px',
  defaultColDef,
  ...rest // Capture all other AG Grid props
}) => {

  const defaultColDefMemo = useMemo<ColDef>(() => ({
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
    ...defaultColDef,
  }), [defaultColDef]);
  
  const gridClassName = "ag-theme-quartz"; 

  return (
    <div className={gridClassName} style={{ height, width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDefMemo}
        {...rest} // Pass all other props through to the grid
      />
    </div>
  );
};