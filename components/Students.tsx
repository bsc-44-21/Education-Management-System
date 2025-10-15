import React, { useState, useMemo } from 'react';
import { STUDENTS_DATA } from '../constants';
import { Student } from '../types';
import StudentForm from './StudentForm';
import ConfirmationDialog from './ConfirmationDialog';
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon } from './icons/Icons';

const Students: React.FC = () => {
    const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

    const filteredStudents = useMemo(() =>
        students.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.id.toLowerCase().includes(searchTerm.toLowerCase())
        ), [students, searchTerm]);

    const handleAdd = () => {
        setFormMode('add');
        setStudentToEdit(null);
        setIsFormOpen(true);
    };

    const handleEdit = (student: Student) => {
        setFormMode('edit');
        setStudentToEdit(student);
        setIsFormOpen(true);
    };
    
    const handleDelete = (student: Student) => {
        setStudentToDelete(student);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (studentToDelete) {
            setStudents(prev => prev.filter(s => s.id !== studentToDelete.id));
            setIsConfirmOpen(false);
            setStudentToDelete(null);
        }
    };

    const handleSave = (studentData: Student) => {
        if (formMode === 'add') {
            const newStudent = { ...studentData, id: `S${Date.now()}` };
            setStudents(prev => [newStudent, ...prev]);
        } else {
            setStudents(prev => prev.map(s => s.id === studentData.id ? studentData : s));
        }
        setIsFormOpen(false);
    };
    
    const getStatusChip = (status: 'Active' | 'Inactive') => {
        return status === 'Active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    };

    return (
        <>
            <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-auto">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full sm:w-64 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="h-5 w-5" /> Add Student
                </button>
            </div>

            <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left text-slate-500 dark:text-gray-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-gray-900 dark:text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Grade</th>
                                <th scope="col" className="px-6 py-3">Enrollment Date</th>
                                <th scope="col" className="px-6 py-3">Parent Contact</th>
                                <th scope="col" className="px-6 py-3 text-center">Status</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id} className="bg-white dark:bg-black border-b dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4 font-mono text-slate-700 dark:text-gray-300">{student.id}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{student.name}</td>
                                    <td className="px-6 py-4 text-center">{student.grade}</td>
                                    <td className="px-6 py-4">{student.enrollmentDate}</td>
                                    <td className="px-6 py-4">{student.parentContact}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChip(student.status)}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center gap-4">
                                            <button onClick={() => handleEdit(student)} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400" aria-label={`Edit ${student.name}`}>
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => handleDelete(student)} className="text-red-600 hover:text-red-800 dark:hover:text-red-400" aria-label={`Delete ${student.name}`}>
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <StudentForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSave={handleSave}
                studentToEdit={studentToEdit}
                mode={formMode}
            />

            <ConfirmationDialog 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Student"
                message={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
                confirmButtonText="Delete"
            />
        </>
    );
};

export default Students;
