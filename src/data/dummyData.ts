import { User, Course, Material, Assignment, Submission, Grade, Announcement, Enrollment } from '../types';

export const users: User[] = [
  { id: 1, name: 'Nitish Chandra Singha', email: 'nitish@example.com', role: 'Student' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', role: 'Student' },
  { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'Student' },
  { id: 4, name: 'Mohit Singh', email: 'mohit@example.com', role: 'Instructor' },
  { id: 5, name: 'Papai Mandal', email: 'papai@example.com', role: 'Instructor' },
  { id: 6, name: 'Dr. Anita Roy', email: 'anita@example.com', role: 'Instructor' },
  { id: 7, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
];

export const courses: Course[] = [
  {
    id: 101,
    title: 'Software Engineering',
    code: 'CSE401',
    instructor: 'Mohit Singh',
    semester: '4th',
    description: 'Learn software development methodologies, SDLC, and project management.',
    enrolledStudents: 45,
  },
  {
    id: 102,
    title: 'Database Management Systems',
    code: 'CSE402',
    instructor: 'Papai Mandal',
    semester: '4th',
    description: 'Master SQL, database design, normalization, and transaction management.',
    enrolledStudents: 52,
  },
  {
    id: 103,
    title: 'Data Structures & Algorithms',
    code: 'CSE301',
    instructor: 'Dr. Anita Roy',
    semester: '3rd',
    description: 'Deep dive into algorithms, complexity analysis, and data structures.',
    enrolledStudents: 60,
  },
  {
    id: 104,
    title: 'Web Development',
    code: 'CSE403',
    instructor: 'Mohit Singh',
    semester: '4th',
    description: 'Build modern web applications using React, Node.js, and databases.',
    enrolledStudents: 38,
  },
  {
    id: 105,
    title: 'Machine Learning',
    code: 'CSE501',
    instructor: 'Dr. Anita Roy',
    semester: '5th',
    description: 'Introduction to ML algorithms, neural networks, and AI applications.',
    enrolledStudents: 42,
  },
];

export const materials: Material[] = [
  { id: 1, courseId: 101, title: 'Lecture Notes - Chapter 1', type: 'PDF', uploadDate: '2025-11-01', file: 'se_lecture1.pdf' },
  { id: 2, courseId: 101, title: 'SDLC Models Presentation', type: 'PPT', uploadDate: '2025-11-03', file: 'sdlc_models.pptx' },
  { id: 3, courseId: 102, title: 'SQL Basics Tutorial', type: 'PDF', uploadDate: '2025-11-02', file: 'sql_basics.pdf' },
  { id: 4, courseId: 102, title: 'Normalization Examples', type: 'PDF', uploadDate: '2025-11-05', file: 'normalization.pdf' },
  { id: 5, courseId: 103, title: 'Sorting Algorithms Video', type: 'Video', uploadDate: '2025-10-28', file: 'sorting_algos.mp4' },
  { id: 6, courseId: 104, title: 'React Components Guide', type: 'PDF', uploadDate: '2025-11-04', file: 'react_guide.pdf' },
  { id: 7, courseId: 105, title: 'ML Introduction Slides', type: 'PPT', uploadDate: '2025-11-06', file: 'ml_intro.pptx' },
];

export const assignments: Assignment[] = [
  {
    id: 1,
    courseId: 101,
    title: 'SRS Document Preparation',
    description: 'Create a Software Requirements Specification document for a given project.',
    dueDate: '2025-11-30',
    maxMarks: 20,
    submitted: false,
  },
  {
    id: 2,
    courseId: 102,
    title: 'Database Schema Design',
    description: 'Design a normalized database schema for an e-commerce system.',
    dueDate: '2025-11-25',
    maxMarks: 25,
    submitted: true,
  },
  {
    id: 3,
    courseId: 103,
    title: 'Algorithm Implementation',
    description: 'Implement and analyze various sorting algorithms.',
    dueDate: '2025-11-20',
    maxMarks: 30,
    submitted: true,
  },
  {
    id: 4,
    courseId: 104,
    title: 'Full Stack Web Application',
    description: 'Build a complete web application with frontend and backend.',
    dueDate: '2025-12-05',
    maxMarks: 40,
    submitted: false,
  },
  {
    id: 5,
    courseId: 105,
    title: 'ML Model Training',
    description: 'Train and evaluate a machine learning model on a given dataset.',
    dueDate: '2025-12-10',
    maxMarks: 35,
    submitted: false,
  },
];

export const submissions: Submission[] = [
  {
    id: 1,
    assignmentId: 2,
    studentId: 1,
    studentName: 'Nitish Chandra Singha',
    submittedDate: '2025-11-24',
    file: 'db_schema_nitish.pdf',
    grade: 22,
    feedback: 'Excellent work! Well-normalized schema.',
  },
  {
    id: 2,
    assignmentId: 2,
    studentId: 2,
    studentName: 'Priya Sharma',
    submittedDate: '2025-11-25',
    file: 'db_schema_priya.pdf',
    grade: 20,
    feedback: 'Good effort. Minor improvements needed in normalization.',
  },
  {
    id: 3,
    assignmentId: 3,
    studentId: 1,
    studentName: 'Nitish Chandra Singha',
    submittedDate: '2025-11-19',
    file: 'algo_impl_nitish.zip',
    grade: 28,
    feedback: 'Great implementation and analysis!',
  },
  {
    id: 4,
    assignmentId: 3,
    studentId: 3,
    studentName: 'Rahul Kumar',
    submittedDate: '2025-11-20',
    file: 'algo_impl_rahul.zip',
  },
];

export const grades: Grade[] = [
  { studentId: 1, courseId: 102, courseName: 'Database Management Systems', marks: 22, maxMarks: 25, feedback: 'Excellent work! Well-normalized schema.' },
  { studentId: 1, courseId: 103, courseName: 'Data Structures & Algorithms', marks: 28, maxMarks: 30, feedback: 'Great implementation and analysis!' },
  { studentId: 2, courseId: 102, courseName: 'Database Management Systems', marks: 20, maxMarks: 25, feedback: 'Good effort. Minor improvements needed.' },
  { studentId: 3, courseId: 101, courseName: 'Software Engineering', marks: 18, maxMarks: 20, feedback: 'Well structured SRS document.' },
];

export const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Mid-Semester Exam Schedule Released',
    content: 'The mid-semester examination schedule has been published. Please check your respective course pages for details.',
    author: 'Admin User',
    date: '2025-11-10',
    isSystemWide: true,
  },
  {
    id: 2,
    title: 'Assignment Deadline Extension',
    content: 'The Database Schema Design assignment deadline has been extended to Nov 25.',
    author: 'Papai Mandal',
    date: '2025-11-08',
    courseId: 102,
    isSystemWide: false,
  },
  {
    id: 3,
    title: 'Guest Lecture on Agile Methodology',
    content: 'A guest lecture will be conducted on Nov 18 at 2 PM. Attendance is mandatory.',
    author: 'Mohit Singh',
    date: '2025-11-07',
    courseId: 101,
    isSystemWide: false,
  },
  {
    id: 4,
    title: 'Library Hours Extended',
    content: 'The library will remain open until 10 PM during exam season.',
    author: 'Admin User',
    date: '2025-11-09',
    isSystemWide: true,
  },
];

export const enrollments: Enrollment[] = [
  { studentId: 1, courseId: 101, enrolledDate: '2025-08-01' },
  { studentId: 1, courseId: 102, enrolledDate: '2025-08-01' },
  { studentId: 1, courseId: 103, enrolledDate: '2025-08-01' },
  { studentId: 2, courseId: 102, enrolledDate: '2025-08-02' },
  { studentId: 2, courseId: 104, enrolledDate: '2025-08-02' },
  { studentId: 3, courseId: 101, enrolledDate: '2025-08-01' },
  { studentId: 3, courseId: 103, enrolledDate: '2025-08-01' },
];
