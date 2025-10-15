import React, { useState, useMemo } from 'react';
import { ATTENDANCE_DATA_RAW } from '../constants';
import { AttendanceRecord, AttendanceStatus } from '../types';

const Attendance: React.FC = () => {
    const [records] = useState<AttendanceRecord[]>(ATTENDANCE_DATA_RAW);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [gradeFilter, setGradeFilter] = useState<string>('all');

    const filteredRecords = useMemo(() => {
        return records.filter(record => {
            const dateMatch = record.date === selectedDate;
            const gradeMatch = gradeFilter === 'all' || record.grade === parseInt(gradeFilter);
            return dateMatch && gradeMatch;
        });
    }, [records, selectedDate, gradeFilter]);

    const getStatusChip = (status: AttendanceStatus) => {
        switch (status) {
            case 'Present':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'Absent':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'Late':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'Excused':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const uniqueDates = useMemo(() => [...new Set(ATTENDANCE_DATA_RAW.map(r => r.date))].sort((a,b) => b.localeCompare(a)), []);

    return (
        <>
            <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-4 items-center">
                    <div>
                        <label htmlFor="date-filter" className="text-sm font-medium text-slate-700 dark:text-gray-300 mr-2">Date:</label>
                        <select
                            id="date-filter"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        >
                            {uniqueDates.map(date => <option key={date} value={date}>{date}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="grade-filter" className="text-sm font-medium text-slate-700 dark:text-gray-300 mr-2">Grade:</label>
                        <select
                            id="grade-filter"
                            value={gradeFilter}
                            onChange={(e) => setGradeFilter(e.target.value)}
                             className="bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
                        >
                            <option value="all">All Grades</option>
                            <option value="9">Grade 9</option>
                            <option value="10">Grade 10</option>
                            <option value="11">Grade 11</option>
                            <option value="12">Grade 12</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-gray-900 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student ID</th>
                                <th scope="col" className="px-6 py-3">Student Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Grade</th>
                                <th scope="col" className="px-6 py-3 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map(record => (
                                <tr key={record.studentId} className="bg-white dark:bg-black border-b dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4 font-mono text-slate-700 dark:text-gray-300">{record.studentId}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{record.studentName}</td>
                                    <td className="px-6 py-4 text-center">{record.grade}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(record.status)}`}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredRecords.length === 0 && (
                        <div className="text-center py-8 text-slate-500 dark:text-gray-400">
                            No attendance records found for the selected filters.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Attendance;
