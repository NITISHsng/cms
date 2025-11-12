import { useState } from 'react';
import { BookOpen, Search, Check, X, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { courses, enrollments as initialEnrollments } from '../../data/dummyData';
import { Enrollment } from '../../types';

const StudentCourses = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);

  const isEnrolled = (courseId: number) => {
    return enrollments.some(e => e.studentId === currentUser?.id && e.courseId === courseId);
  };

  const handleToggleEnrollment = (courseId: number) => {
    if (isEnrolled(courseId)) {
      setEnrollments(enrollments.filter(e => !(e.studentId === currentUser?.id && e.courseId === courseId)));
    } else {
      const newEnrollment: Enrollment = {
        studentId: currentUser?.id || 0,
        courseId,
        enrolledDate: new Date().toISOString().split('T')[0],
      };
      setEnrollments([...enrollments, newEnrollment]);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enrolledCourses = filteredCourses.filter(c => isEnrolled(c.id));
  const availableCourses = filteredCourses.filter(c => !isEnrolled(c.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Courses</h1>
        <p className="text-slate-600 mt-1">Manage your course enrollments</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses by title, code, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Enrolled Courses ({enrolledCourses.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center justify-between text-white mb-2">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">{course.code}</span>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Instructor:</span> {course.instructor}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Semester:</span> {course.semester}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledStudents} students</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{course.description}</p>
                <button
                  onClick={() => handleToggleEnrollment(course.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <X className="w-4 h-4" />
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
        {enrolledCourses.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No enrolled courses found</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Available Courses ({availableCourses.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-6">
                <div className="flex items-center justify-between text-white mb-2">
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">{course.code}</span>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Instructor:</span> {course.instructor}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Semester:</span> {course.semester}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledStudents} students</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{course.description}</p>
                <button
                  onClick={() => handleToggleEnrollment(course.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
                >
                  <Check className="w-4 h-4" />
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
