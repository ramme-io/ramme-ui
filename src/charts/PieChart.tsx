// packages/ui/src/charts/PieChart.tsx
"use client";

import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartTheme } from '../hooks/useChartTheme';

export interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
}

/**
 * @wizard
 * @name PieChart
 * @description A theme-aware pie chart component powered by Recharts, for showing proportional relationships of parts to a whole.
 * @tags charts, data-visualization, rechart
 * @category charts
 */

export const PieChart: React.FC<PieChartProps> = ({ data, dataKey, nameKey }) => {
  const { textColor, palette } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie data={data} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={100} labelLine={false}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={palette[index % palette.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ color: textColor }} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};