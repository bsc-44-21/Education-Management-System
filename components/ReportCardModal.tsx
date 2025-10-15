import React from 'react';
// FIX: Corrected import path for types.
import { Student, Grade } from '../types';
// FIX: Corrected import path for icons.
import { CloseIcon, GraduationCapIcon } from './icons/Icons';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  grade: Grade | null;
}

const ReportCardModal: React.FC<ReportCardModalProps> = ({ isOpen, onClose, student, grade }) => {
  if (!isOpen) return null;

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-500 font-bold';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-black dark:border dark:border-gray-700 rounded-lg shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCapIcon className="h-7 w-7 text-blue-600" />
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Report Card
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white" aria-label="Close modal">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b dark:border-gray-800">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{student.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">Student ID: {student.id}</p>
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-300">
                    <p><span className="font-semibold">Grade:</span> {student.grade}</p>
                    <p><span className="font-semibold">Status:</span> {student.status}</p>
                    <p><span className="font-semibold">Parent Contact:</span> {student.parentContact}</p>
                </div>
            </div>

            <h4 className="text-md font-semibold text-slate-800 dark:text-white mb-4">Subject Performance</h4>
            
            {grade ? (
                <ul className="space-y-3">
                    {Object.entries(grade.subjects).map(([subject, score]) => (
                        <li key={subject} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-gray-900 rounded-md">
                            <span className="font-medium text-slate-700 dark:text-gray-200 capitalize">{subject}</span>
                            <span className={`text-lg font-mono ${getGradeColor(score)}`}>
                                {score}
                            </span>
                        </li>
                    ))}
                    <li className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/50 rounded-md mt-4">
                        <span className="font-bold text-lg text-blue-800 dark:text-blue-200">Overall Average</span>
                        <span className={`text-2xl font-bold font-mono ${getGradeColor(grade.average)}`}>
                            {grade.average.toFixed(2)}
                        </span>
                    </li>
                </ul>
            ) : (
                <p className="text-center text-slate-500 dark:text-gray-400">No grade information available for this student.</p>
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

export default ReportCardModal;