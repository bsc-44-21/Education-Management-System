import React from 'react';
// FIX: Corrected import path for icons.
import { SearchIcon, BellIcon, ChevronDownIcon, MenuIcon, SunIcon, MoonIcon } from './icons/Icons';
// FIX: Corrected import path for types.
import { Theme } from '../types';

interface HeaderProps {
  title: string;
  setSidebarOpen: (open: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, setSidebarOpen, theme, toggleTheme }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between dark:bg-black dark:border-b dark:border-gray-800">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-500 mr-4">
            <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-5">
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
          />
        </div>
        <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors">
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
        <button className="relative text-slate-500 hover:text-blue-600">
          <BellIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src="https://picsum.photos/id/237/200/200"
            alt="Admin"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="hidden sm:block">
            <p className="font-semibold text-sm dark:text-gray-200">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">Administrator</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <ChevronDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;