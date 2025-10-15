
import React from 'react';
// FIX: Corrected import path for types.
import { View } from '../types';
// FIX: Corrected import path for icons.
import { DashboardIcon, StudentsIcon, GradesIcon, AttendanceIcon, FinanceIcon, LibraryIcon, SettingsIcon, GraduationCapIcon } from './icons/Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NavLink: React.FC<{
  view: View;
  label: string;
  currentView: View;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ view, label, currentView, onClick, icon }) => {
  const isActive = currentView === view;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = (view: View) => {
    setCurrentView(view);
    if(window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`absolute md:relative inset-y-0 left-0 bg-black text-white w-64 space-y-6 py-7 px-4 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col`}>
        <div className="flex items-center space-x-3 px-4">
            <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCapIcon className="h-8 w-8 text-white" />
            </div>
          <h2 className="text-2xl font-extrabold text-white">SmartSchool</h2>
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink icon={<DashboardIcon className="h-5 w-5"/>} view={View.DASHBOARD} label="Dashboard" currentView={currentView} onClick={() => handleNavClick(View.DASHBOARD)} />
          <NavLink icon={<StudentsIcon className="h-5 w-5"/>} view={View.STUDENTS} label="Students" currentView={currentView} onClick={() => handleNavClick(View.STUDENTS)} />
          <NavLink icon={<GradesIcon className="h-5 w-5"/>} view={View.GRADES} label="Grades" currentView={currentView} onClick={() => handleNavClick(View.GRADES)} />
          <NavLink icon={<AttendanceIcon className="h-5 w-5"/>} view={View.ATTENDANCE} label="Attendance" currentView={currentView} onClick={() => handleNavClick(View.ATTENDANCE)} />
          <NavLink icon={<FinanceIcon className="h-5 w-5"/>} view={View.FINANCE} label="Finance" currentView={currentView} onClick={() => handleNavClick(View.FINANCE)} />
          <NavLink icon={<LibraryIcon className="h-5 w-5"/>} view={View.LIBRARY} label="Library" currentView={currentView} onClick={() => handleNavClick(View.LIBRARY)} />
        </nav>
        <div className="mt-auto">
           <NavLink icon={<SettingsIcon className="h-5 w-5"/>} view={View.SETTINGS} label="Settings" currentView={currentView} onClick={() => handleNavClick(View.SETTINGS)} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;