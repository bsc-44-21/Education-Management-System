import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Corrected import path for constants.
import { ENROLLMENT_DATA } from '../../constants';
// FIX: Corrected import path for types.
import { Theme } from '../../types';

interface EnrollmentChartProps {
  theme: Theme;
}

const EnrollmentChart: React.FC<EnrollmentChartProps> = ({ theme }) => {
  const tickColor = theme === 'dark' ? '#FFFFFF' : '#64748b';
  const gridColor = theme === 'dark' ? '#444444' : '#e2e8f0';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={ENROLLMENT_DATA}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis dataKey="grade" tick={{ fill: tickColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }}/>
        <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }}/>
        <Tooltip
          contentStyle={{
            backgroundColor: theme === 'dark' ? '#000000' : 'white',
            border: `1px solid ${gridColor}`,
            borderRadius: '0.5rem',
          }}
          cursor={{ fill: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(203, 213, 225, 0.5)' }}
        />
        <Legend wrapperStyle={{ fontSize: '14px', color: tickColor }} />
        <Bar dataKey="students" fill={theme === 'dark' ? '#FFF' : '#3b82f6'} name="Number of Students" barSize={40} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnrollmentChart;