// src/index.ts

// 1. Import the master stylesheet for the entire library
import './index.css';

// 2. Export all types for consumers
export type * from './types/wizard.d';
export type { ThemeName } from './contexts/ThemeContext';
export type { MultiSelectOption } from './form/MultiSelect';

// AGgrid types
export type {
  // Core Types
  ColDef,
  ColGroupDef,
  GridOptions,
  GridApi,
  ColumnApi,
  
  // Value and Cell Renderer Types
  ValueFormatterParams,
  ValueGetterParams,
  ICellRendererParams,
  
  // Event Types
  CellClickedEvent,
  RowSelectedEvent,
  
  // Header Types
  IHeaderParams,
} from 'ag-grid-community';
export * from './data/mockData';

// 3. Export all components, hooks, and utilities

// charts
export * from './charts/BarChart';
export * from './charts/ChartWithTable';
export * from './charts/LineChart';
export * from './charts/PieChart';

// contexts
export * from './contexts/ThemeContext';

// data-display
export * from './data-display/DataTable';
export * from './data-display/Table';

// feedback
export * from './feedback/Alert';
export * from './feedback/EmptyState';
export * from './feedback/TippyTooltip';
export * from './feedback/Toast';
export * from './feedback/ToastProvider';

// form
export * from './form/ButtonGroup';
export * from './form/Checkbox';
export * from './form/ComboBox';
export * from './form/DatePicker';
export * from './form/FileUpload';
export * from './form/FormTemplate';
export * from './form/Input';
export * from './form/MultiSelect';
export * from './form/Radio';
export * from './form/SearchInput';
export * from './form/Select';
export * from './form/Textarea';
export * from './form/ToggleSwitch';

// hooks
export * from './hooks/useDataFetch';

// layout
export * from './layout/Accordion';
export * from './layout/Card';
export * from './layout/Drawer';
export * from './layout/List';
export * from './layout/Modal';
export * from './layout/Sidebar'; 

// navigation
export * from './navigation/Breadcrumbs';
export * from './navigation/Menu';
export * from './navigation/Pagination';
export * from './navigation/Stepper';
export * from './navigation/Tabs';

// templates-patterns
export * from './templates-patterns/ActionBar';
export * from './templates-patterns/ActivityFeed';
export * from './templates-patterns/PageHeader';
export * from './templates-patterns/SectionHeader';
export * from './templates-patterns/StatCard';

// ui
export * from './ui/Avatar';
export * from './ui/Badge';
export * from './ui/Button';
export * from './ui/ChatFAB';
export * from './ui/Icon';
export * from './ui/CodeBlock';

// ai 
export * from './ai/Loader';
export * from './ai/Actions';
export * from './ai/PromptInput';
export * from './ai/Message';
export * from './ai/Conversation';