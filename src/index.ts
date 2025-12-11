// src/index.ts

// 1. Import the master stylesheet for the entire library
import './index.css';

// 2. Export all types for consumers
export type * from './lib/types/wizard';
export type { ThemeName } from './contexts/ThemeContext';
export type { MultiSelectOption } from './components/forms/MultiSelect';

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

// ai 
export * from './blocks/ai/Loader';
export * from './blocks/ai/Actions';
export * from './blocks/ai/PromptInput';
export * from './blocks/ai/Message';
export * from './blocks/ai/Conversation';
export * from './blocks/ai/ChatFAB';

// contexts
export * from './contexts/ThemeContext';

// data-display
export * from './components/data-display/ActivityFeed';
export * from './components/data-display/DataTable';
export * from './components/data-display/Table';
export * from './components/data-display/BarChart';
export * from './components/data-display/ChartWithTable';
export * from './components/data-display/LineChart';
export * from './components/data-display/PieChart';
export * from './components/data-display/CodeBlock';
export * from './components/data-display/StatCard';
export * from './components/data-display/StatusBadge';

// feedback
export * from './components/feedback/Alert';
export * from './components/feedback/EmptyState';
export * from './components/feedback/TippyTooltip';
export * from './components/feedback/Toast';
export * from './components/feedback/ToastProvider';

// forms
export * from './components/forms/ButtonGroup';
export * from './components/forms/Checkbox';
export * from './components/forms/ComboBox';
export * from './components/forms/DatePicker';
export * from './components/forms/FileUpload';
export * from './components/forms/FormTemplate';
export * from './components/forms/Input';
export * from './components/forms/MultiSelect';
export * from './components/forms/Radio';
export * from './components/forms/SearchInput';
export * from './components/forms/SegmentedControl';
export * from './components/forms/Select';
export * from './components/forms/Textarea';
export * from './components/forms/ToggleSwitch';

// hooks
export * from './lib/hooks/useDataFetch';

// iot
export * from './blocks/iot/DeviceCard';

// layout
export * from './components/layout/Accordion';
export * from './components/layout/Card';
export * from './components/layout/Drawer';
export * from './components/layout/List';
export * from './components/layout/Modal';
export * from './components/layout/Sidebar'; 
export * from './components/layout/ActionBar';
export * from './components/layout/PageHeader';
export * from './components/layout/SectionHeader';


// navigation
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/Menu';
export * from './components/navigation/Pagination';
export * from './components/navigation/Stepper';
export * from './components/navigation/Tabs';

// ui
export * from './components/ui/Avatar';
export * from './components/ui/Badge';
export * from './components/ui/Button';
export * from './components/ui/Icon';

