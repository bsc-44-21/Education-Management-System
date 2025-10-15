import React from 'react';
// FIX: Corrected import path for icons.
import { ExclamationIcon } from './icons/Icons';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message, confirmButtonText = 'Confirm' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="bg-white dark:bg-black dark:border dark:border-gray-700 rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-800">
                <ExclamationIcon className="h-6 w-6 text-red-600 dark:text-white" />
            </div>
            <h3 id="dialog-title" className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">{title}</h3>
            <div className="mt-2 text-sm text-slate-600 dark:text-gray-300">
                <p>{message}</p>
            </div>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-gray-800 flex justify-center gap-3">
          <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-gray-400">
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;