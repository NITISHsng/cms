import { useState } from 'react';
import { BookOpen, Search, Users } from 'lucide-react';
import { courses, users } from '../../data/dummyData';

const AdminCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const instructors = users.filter(u => u.role === 'Instructor');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Manage Courses</h1>
        <p className="text-slate-600 mt-1">View and monitor all courses in the system</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Total Courses</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{courses.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Total Instructors</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{instructors.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Avg. Enrollment</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {Math.round(courses.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0) / courses.length)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Course Code</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Title</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Instructor</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Semester</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <span className="font-semibold text-blue-600">{course.code}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800">{course.title}</p>
                    <p className="text-sm text-slate-500">{course.description}</p>
                  </td>
                  <td className="py-4 px-6 text-slate-700">{course.instructor}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                      {course.semester}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-800">{course.enrolledStudents}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCourses.length === 0 && (
          <div className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No courses found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
