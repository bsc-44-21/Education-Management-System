import React, { useState, useEffect } from 'react';
// FIX: Corrected import path for types.
import { Student } from '../types';
// FIX: Corrected import path for icons.
import { CloseIcon } from './icons/Icons';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  studentToEdit: Student | null;
  mode: 'add' | 'edit';
}

const emptyStudent: Omit<Student, 'id'> = {
  name: '',
  grade: 9,
  enrollmentDate: new Date().toISOString().split('T')[0],
  parentContact: '',
  status: 'Active',
};

const StudentForm: React.FC<StudentFormProps> = ({ isOpen, onClose, onSave, studentToEdit, mode }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'> & { id?: string }>(emptyStudent);

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && studentToEdit) {
        setFormData(studentToEdit);
      } else {
        setFormData(emptyStudent);
      }
    }
  }, [isOpen, mode, studentToEdit]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'grade' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Student);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white dark:bg-black dark:border dark:border-gray-700 rounded-lg shadow-xl w-full max-w-md m-4" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {mode === 'edit' ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white" aria-label="Close form">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {mode === 'edit' && formData.id && (
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Student ID</label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={formData.id}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-slate-100 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
                />
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Grade</label>
                    <input type="number" name="grade" id="grade" value={formData.grade} onChange={handleChange} required min="1" max="12" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Status</label>
                    <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="enrollmentDate" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Enrollment Date</label>
                <input type="date" name="enrollmentDate" id="enrollmentDate" value={formData.enrollmentDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
             <div>
                <label htmlFor="parentContact" className="block text-sm font-medium text-slate-700 dark:text-gray-300">Parent Contact</label>
                <input type="email" name="parentContact" id="parentContact" value={formData.parentContact} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
              Cancel
            </button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {mode === 'edit' ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;