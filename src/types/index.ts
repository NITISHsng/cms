export type UserRole = 'Student' | 'Instructor' | 'Admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Course {
  id: number;
  title: string;
  code: string;
  instructor: string;
  semester: string;
  description: string;
  enrolledStudents?: number;
}

export interface Material {
  id: number;
  courseId: number;
  title: string;
  type: string;
  uploadDate: string;
  file: string;
}

export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  submitted?: boolean;
}

export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  studentName: string;
  submittedDate: string;
  file: string;
  grade?: number;
  feedback?: string;
}

export interface Grade {
  studentId: number;
  courseId: number;
  courseName: string;
  marks: number;
  maxMarks: number;
  feedback: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  courseId?: number;
  isSystemWide: boolean;
}

export interface Enrollment {
  studentId: number;
  courseId: number;
  enrolledDate: string;
}
