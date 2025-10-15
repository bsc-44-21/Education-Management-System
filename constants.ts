import { Student, Grade, AttendanceRecord } from './types';

export const STUDENTS_DATA: Student[] = [
  { id: 'S001', name: 'Alice Johnson', grade: 10, enrollmentDate: '2023-09-01', parentContact: 'alice.p@example.com', status: 'Active' },
  { id: 'S002', name: 'Bob Smith', grade: 11, enrollmentDate: '2022-09-01', parentContact: 'bob.p@example.com', status: 'Active' },
  { id: 'S003', name: 'Charlie Brown', grade: 9, enrollmentDate: '2023-09-01', parentContact: 'charlie.p@example.com', status: 'Active' },
  { id: 'S004', name: 'Diana Prince', grade: 12, enrollmentDate: '2021-09-01', parentContact: 'diana.p@example.com', status: 'Inactive' },
  { id: 'S005', name: 'Ethan Hunt', grade: 10, enrollmentDate: '2023-09-01', parentContact: 'ethan.p@example.com', status: 'Active' },
  { id: 'S006', name: 'Fiona Glenanne', grade: 11, enrollmentDate: '2022-09-01', parentContact: 'fiona.p@example.com', status: 'Active' },
  { id: 'S007', name: 'George Costanza', grade: 9, enrollmentDate: '2023-09-01', parentContact: 'george.p@example.com', status: 'Active' },
  { id: 'S008', name: 'Hannah Montana', grade: 12, enrollmentDate: '2021-09-01', parentContact: 'hannah.p@example.com', status: 'Active' },
];

const calculateAverage = (subjects: { math: number; science: number; english: number; history: number; }) => {
    const grades = Object.values(subjects);
    return grades.reduce((acc, curr) => acc + curr, 0) / grades.length;
}

const GRADES_SUBJECTS = [
    { math: 92, science: 88, english: 95, history: 90 },
    { math: 78, science: 82, english: 80, history: 75 },
    { math: 85, science: 90, english: 88, history: 82 },
    { math: 95, science: 98, english: 92, history: 96 },
    { math: 65, science: 70, english: 68, history: 72 },
    { math: 88, science: 85, english: 90, history: 86 },
    { math: 72, science: 75, english: 70, history: 68 },
    { math: 98, science: 95, english: 99, history: 97 },
];

export const GRADES_DATA: Grade[] = STUDENTS_DATA.map((student, index) => {
    const subjects = GRADES_SUBJECTS[index % GRADES_SUBJECTS.length];
    return {
        studentId: student.id,
        studentName: student.name,
        subjects: subjects,
        average: calculateAverage(subjects),
    };
});

export const ATTENDANCE_DATA_RAW: AttendanceRecord[] = [
    ...STUDENTS_DATA.filter(s => s.id !== 'S002' && s.id !== 'S005').map(s => ({ studentId: s.id, studentName: s.name, grade: s.grade, date: '2024-05-20', status: 'Present' as const })),
    { studentId: 'S002', studentName: 'Bob Smith', grade: 11, date: '2024-05-20', status: 'Absent' },
    { studentId: 'S005', studentName: 'Ethan Hunt', grade: 10, date: '2024-05-20', status: 'Late' },
    ...STUDENTS_DATA.filter(s => s.id !== 'S007').map(s => ({ studentId: s.id, studentName: s.name, grade: s.grade, date: '2024-05-21', status: 'Present' as const })),
    { studentId: 'S007', studentName: 'George Costanza', grade: 9, date: '2024-05-21', status: 'Excused' },
    ...STUDENTS_DATA.map(s => ({ studentId: s.id, studentName: s.name, grade: s.grade, date: '2024-05-22', status: 'Present' as const })),
];


export const ENROLLMENT_DATA = [
  { grade: 'Grade 9', students: 150 },
  { grade: 'Grade 10', students: 200 },
  { grade: 'Grade 11', students: 180 },
  { grade: 'Grade 12', students: 170 },
];

export const ATTENDANCE_DATA = [
  { name: 'Present', value: 950, fill: '#10b981' },
  { name: 'Absent', value: 50, fill: '#ef4444' },
];
