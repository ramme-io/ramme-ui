// packages/ui/src/charts/LineChart.tsx
"use client";

import React from 'react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  XAxisProps, // <-- 1. Import XAxisProps
  YAxisProps  // <-- 2. Import YAxisProps
} from 'recharts';
import { useChartTheme } from '../hooks/useChartTheme';

export interface LineChartProps {
  data: any[];
  dataKeyX: string;
  lineKeys: string[];
  xAxisProps?: XAxisProps; // <-- 3. Add prop for X-axis rules
  yAxisProps?: YAxisProps; // <-- 4. Add prop for Y-axis rules
  [key: string]: any; // <-- 5. "catch-all" for dot, connectNulls
}

/**
 * @wizard
 * @name LineChart
 * @description A theme-aware line chart component...
 */
export const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  dataKeyX, 
  lineKeys, 
  xAxisProps, // <-- 6. Get the new props
  yAxisProps,
  ...restOfProps // <-- 7. Get the rest (dot, connectNulls)
}) => {
  const { textColor, gridColor, tooltipBg, palette } = useChartTheme();

  // Add a "No Data" state
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No data to display</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis 
          dataKey={dataKeyX} 
          stroke={textColor} 
          tick={{ fill: textColor }}
          {...xAxisProps} // <-- 8. SPREAD the X-axis rules here
        />
        <YAxis 
          stroke={textColor} 
          tick={{ fill: textColor }}
          {...yAxisProps} // <-- 9. SPREAD the Y-axis rules here
        />
        <Tooltip
          contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '0.5rem' }}
          itemStyle={{ color: textColor }}
          labelStyle={{ color: textColor, fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        {lineKeys.map((key, index) => (
          <Line 
            key={key} 
            type="monotone" 
            dataKey={key} 
            stroke={palette[index % palette.length]} 
            strokeWidth={2} 
            activeDot={{ r: 8 }} 
            {...restOfProps} // <-- 10. SPREAD the rest (dot, connectNulls) here
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};