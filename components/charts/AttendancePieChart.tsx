import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Corrected import path for constants.
import { ATTENDANCE_DATA } from '../../constants';
// FIX: Corrected import path for types.
import { Theme } from '../../types';

interface AttendancePieChartProps {
    theme: Theme;
}

const AttendancePieChart: React.FC<AttendancePieChartProps> = ({ theme }) => {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#475569';
  const gridColor = theme === 'dark' ? '#444444' : '#e2e8f0';

  const COLORS_LIGHT = ATTENDANCE_DATA.map(e => e.fill);
  const COLORS_DARK = ['#FFFFFF', '#6b7280'];
  const colors = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={ATTENDANCE_DATA}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
        >
          {ATTENDANCE_DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke={theme === 'dark' ? '#000' : '#fff'} />
          ))}
        </Pie>
        <Tooltip
            contentStyle={{
                backgroundColor: theme === 'dark' ? '#000' : 'white',
                border: `1px solid ${gridColor}`,
                borderRadius: '0.5rem',
            }}
        />
        <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px', color: textColor }}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AttendancePieChart;