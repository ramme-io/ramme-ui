// packages/ui/src/charts/BarChart.tsx
"use client";

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartTheme } from '../hooks/useChartTheme';

// The API is now simpler: it only needs to know the data keys for the bars.
export interface BarChartProps {
  data: any[];
  dataKeyX: string;
  barKeys: string[];
}

/**
 * @wizard
 * @name BarChart
 * @description A theme-aware bar chart component powered by Recharts, for comparing categorical data.
 * @tags charts, data-visualization, rechart
 * @props
 * - name: data
 * type: any[]
 * description: The dataset for the chart. Each object in the array represents a category.
 * - name: dataKeyX
 * type: string
 * description: The key from your data objects to be used for the X-axis (e.g., 'name', 'category').
 * - name: barKeys
 * type: { key: string; color: string }[]
 * description: An array of objects, each specifying a data key for a bar series and its color (e.g., `[{ key: 'pv', color: '#8884d8' }]`).
 * - name: title
 * type: string
 * description: An optional title to display above the chart.
 * @category charts
 */


export const BarChart: React.FC<BarChartProps> = ({ data, dataKeyX, barKeys }) => {
  const { textColor, gridColor, tooltipBg, palette } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey={dataKeyX} stroke={textColor} tick={{ fill: textColor }} />
        <YAxis stroke={textColor} tick={{ fill: textColor }} />
        <Tooltip
          contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '0.5rem' }}
          itemStyle={{ color: textColor }}
          labelStyle={{ color: textColor, fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        {barKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={palette[index % palette.length]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};