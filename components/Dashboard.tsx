import React from 'react';
import EnrollmentChart from './charts/EnrollmentChart';
import AttendancePieChart from './charts/AttendancePieChart';
// FIX: Corrected import path for icons.
import { UserGroupIcon, ClipboardListIcon, CurrencyDollarIcon, CheckCircleIcon } from './icons/Icons';
// FIX: Corrected import path for types.
import { Theme } from '../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 transition-transform hover:scale-105 dark:bg-black dark:border dark:border-gray-800">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

interface DashboardProps {
    theme: Theme;
}

const Dashboard: React.FC<DashboardProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,000" icon={<UserGroupIcon className="h-7 w-7 text-white" />} color="bg-blue-500" />
        <StatCard title="Total Staff" value="75" icon={<ClipboardListIcon className="h-7 w-7 text-white" />} color="bg-orange-500" />
        <StatCard title="Fees Collected" value="$2.5M" icon={<CurrencyDollarIcon className="h-7 w-7 text-white" />} color="bg-green-500" />
        <StatCard title="Attendance" value="97.5%" icon={<CheckCircleIcon className="h-7 w-7 text-white" />} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md dark:bg-black dark:border dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Student Enrollment by Grade</h3>
          <div className="h-80">
            <EnrollmentChart theme={theme} />
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md dark:bg-black dark:border dark:border-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Today's Attendance</h3>
          <div className="h-80">
            <AttendancePieChart theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;