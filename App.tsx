import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Grades from './components/Grades';
import Attendance from './components/Attendance';
import { View, Theme } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard theme={theme} />;
      case View.STUDENTS:
        return <Students />;
      case View.GRADES:
        return <Grades />;
      case View.ATTENDANCE:
        return <Attendance />;
      // Add cases for other views as they are implemented
      case View.FINANCE:
      case View.LIBRARY:
      case View.SETTINGS:
      default:
        return <div className="p-6 dark:text-white">Coming soon: {currentView}</div>;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-100 dark:bg-gray-900 font-sans`}>
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={currentView} 
          setSidebarOpen={setSidebarOpen} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-gray-900 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
