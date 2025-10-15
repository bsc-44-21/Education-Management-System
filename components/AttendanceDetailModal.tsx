import React from 'react';
import { Student, AttendanceRecord } from '../types';
import { CloseIcon } from './icons/Icons';

interface AttendanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  records: AttendanceRecord[];
}

const AttendanceDetailModal: React.FC<AttendanceDetailModalProps> = ({ isOpen, onClose, student, records }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-black dark:border dark:border-gray-700 rounded-lg shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Attendance for {student.name}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white" aria-label="Close modal">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {records.length > 0 ? (
            <ul className="space-y-2">
              {records.map(record => (
                <li key={record.date} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-gray-900 rounded-md">
                  <span className="font-medium text-slate-700 dark:text-gray-200">{record.date}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full`}>
                    {record.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-slate-500 dark:text-gray-400">No attendance records found.</p>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-800 flex justify-end">
          <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailModal;
