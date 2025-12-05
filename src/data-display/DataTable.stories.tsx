import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { ColDef } from 'ag-grid-community';

const meta = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Mock Data and Columns ---
const rowData = [
  { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
  { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
  { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  { make: 'Mercedes', model: 'EQS', price: 104400, electric: true },
];

const columnDefs: ColDef[] = [
  { field: 'make' },
  { field: 'model' },
  { field: 'price' },
  { field: 'electric' },
];

export const Default: Story = {
  args: {
    rowData: rowData,
    columnDefs: columnDefs,
    height: '400px',
  },
};