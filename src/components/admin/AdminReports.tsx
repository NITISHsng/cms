import { FileText, Download, TrendingUp, Users, BookOpen } from 'lucide-react';
import { users, courses, enrollments, submissions, grades } from '../../data/dummyData';

const AdminReports = () => {
  const totalStudents = users.filter(u => u.role === 'Student').length;
  const totalInstructors = users.filter(u => u.role === 'Instructor').length;
  const totalCourses = courses.length;
  const totalEnrollments = enrollments.length;
  const avgEnrollmentPerStudent = (totalEnrollments / totalStudents).toFixed(1);

  const coursePerformance = courses.map(course => {
    const courseGrades = grades.filter(g => g.courseId === course.id);
    const avgGrade = courseGrades.length > 0
      ? (courseGrades.reduce((sum, g) => sum + (g.marks / g.maxMarks) * 100, 0) / courseGrades.length).toFixed(1)
      : 0;
    return {
      course: course.title,
      code: course.code,
      avgGrade,
      submissions: courseGrades.length,
    };
  });

  const studentPerformance = users
    .filter(u => u.role === 'Student')
    .map(student => {
      const studentGrades = grades.filter(g => g.studentId === student.id);
      const avgGrade = studentGrades.length > 0
        ? (studentGrades.reduce((sum, g) => sum + (g.marks / g.maxMarks) * 100, 0) / studentGrades.length).toFixed(1)
        : 0;
      return {
        name: student.name,
        avgGrade,
        coursesEnrolled: enrollments.filter(e => e.studentId === student.id).length,
      };
    })
    .sort((a, b) => parseFloat(b.avgGrade) - parseFloat(a.avgGrade))
    .slice(0, 5);

  const instructorStats = users
    .filter(u => u.role === 'Instructor')
    .map(instructor => {
      const instructorCourses = courses.filter(c => c.instructor === instructor.name);
      const totalStudents = instructorCourses.reduce((sum, c) => sum + (c.enrolledStudents || 0), 0);
      return {
        name: instructor.name,
        courses: instructorCourses.length,
        students: totalStudents,
      };
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">System performance and statistics</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Students</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{totalStudents}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Courses</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{totalCourses}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Avg Enrollment</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{avgEnrollmentPerStudent}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Submissions</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{submissions.length}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Course Performance</h2>
          <div className="space-y-3">
            {coursePerformance.map((course, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-800">{course.course}</p>
                    <p className="text-sm text-slate-600">{course.code}</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{course.avgGrade}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.avgGrade}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{course.submissions} submissions</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Top Performing Students</h2>
          <div className="space-y-3">
            {studentPerformance.map((student, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">{student.name}</p>
                  <p className="text-sm text-slate-600">{student.coursesEnrolled} courses enrolled</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{student.avgGrade}%</p>
                  <p className="text-xs text-slate-500">Average</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Instructor Statistics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Instructor Name</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Courses</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Total Students</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Avg per Course</th>
              </tr>
            </thead>
            <tbody>
              {instructorStats.map((instructor, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-6 font-medium text-slate-800">{instructor.name}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      {instructor.courses}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-slate-700">{instructor.students}</td>
                  <td className="py-4 px-6 text-center text-slate-700">
                    {instructor.courses > 0 ? Math.round(instructor.students / instructor.courses) : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
