export interface Student {
  id: string;
  name: string;
  grade: number;
  enrollmentDate: string;
  parentContact: string;
  status: 'Active' | 'Inactive';
}

export interface Grade {
  studentId: string;
  studentName: string;
  subjects: {
    math: number;
    science: number;
    english: number;
    history: number;
  };
  average: number;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  grade: number;
  date: string;
  status: AttendanceStatus;
}

export enum View {
  DASHBOARD = 'Dashboard',
  STUDENTS = 'Students',
  GRADES = 'Grades',
  ATTENDANCE = 'Attendance',
  FINANCE = 'Finance',
  LIBRARY = 'Library',
  SETTINGS = 'Settings',
}

export type Theme = 'light' | 'dark';
