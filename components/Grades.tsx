import React, { useState } from 'react';
// FIX: Corrected import path for constants.
import { GRADES_DATA, STUDENTS_DATA } from '../constants';
// FIX: Corrected import path for types.
import { Grade, Student } from '../types';
import ReportCardModal from './ReportCardModal';
// FIX: Corrected import path for icons.
import { EyeIcon } from './icons/Icons';

const Grades: React.FC = () => {
    const [grades, setGrades] = useState(GRADES_DATA);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewReport = (gradeEntry: Grade) => {
        const student = STUDENTS_DATA.find(s => s.id === gradeEntry.studentId);
        if (student) {
            setSelectedStudent(student);
            setIsModalOpen(true);
        }
    };

    const getGradeColor = (grade: number) => {
        if (grade >= 90) return 'text-green-500 font-bold';
        if (grade >= 80) return 'text-blue-500';
        if (grade >= 70) return 'text-yellow-500';
        return 'text-red-500';
    }

    return (
        <>
            <div className="bg-white dark:bg-black rounded-lg shadow-md">
                <div className="p-4 border-b dark:border-gray-800">
                    <h2 className="text-xl font-semibold dark:text-white">Student Grades</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-gray-900 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Math</th>
                                <th scope="col" className="px-6 py-3 text-center">Science</th>
                                <th scope="col" className="px-6 py-3 text-center">English</th>
                                <th scope="col" className="px-6 py-3 text-center">History</th>
                                <th scope="col" className="px-6 py-3 text-center font-semibold">Average</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map(g => (
                                <tr key={g.studentId} className="bg-white dark:bg-black border-b dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{g.studentName}</td>
                                    {Object.values(g.subjects).map((score, i) => (
                                        <td key={i} className={`px-6 py-4 text-center ${getGradeColor(score)}`}>{score}</td>
                                    ))}
                                    <td className={`px-6 py-4 text-center font-bold ${getGradeColor(g.average)}`}>{g.average.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleViewReport(g)} className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 flex items-center gap-1 mx-auto">
                                            <EyeIcon className="h-5 w-5" /> View Report
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedStudent && (
                <ReportCardModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    student={selectedStudent}
                    grade={grades.find(g => g.studentId === selectedStudent.id) || null}
                />
            )}
        </>
    );
};

export default Grades;