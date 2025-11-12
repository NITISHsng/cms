import { BookOpen, ClipboardList, Award, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { enrollments, courses, assignments, grades, announcements } from '../../data/dummyData';

const StudentDashboard = () => {
  const { currentUser } = useAuth();

  const enrolledCourses = enrollments
    .filter(e => e.studentId === currentUser?.id)
    .map(e => courses.find(c => c.id === e.courseId))
    .filter(Boolean);

  const studentAssignments = assignments.filter(a =>
    enrolledCourses.some(c => c?.id === a.courseId)
  );

  const pendingAssignments = studentAssignments.filter(a => !a.submitted);
  const studentGrades = grades.filter(g => g.studentId === currentUser?.id);
  const recentAnnouncements = announcements.slice(0, 3);

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Assignments',
      value: pendingAssignments.length,
      icon: ClipboardList,
      color: 'bg-orange-500',
    },
    {
      title: 'Completed Grades',
      value: studentGrades.length,
      icon: Award,
      color: 'bg-green-500',
    },
    {
      title: 'Announcements',
      value: recentAnnouncements.length,
      icon: Bell,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome back, {currentUser?.name}!</h1>
        <p className="text-slate-600 mt-1">Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Upcoming Assignments</h2>
          <div className="space-y-3">
            {pendingAssignments.slice(0, 4).map((assignment) => {
              const course = courses.find(c => c.id === assignment.courseId);
              return (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{assignment.title}</p>
                    <p className="text-sm text-slate-600">{course?.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-orange-600">Due: {assignment.dueDate}</p>
                    <p className="text-xs text-slate-500">{assignment.maxMarks} marks</p>
                  </div>
                </div>
              );
            })}
            {pendingAssignments.length === 0 && (
              <p className="text-slate-500 text-center py-4">No pending assignments</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-medium text-slate-800">{announcement.title}</p>
                  <span className="text-xs text-slate-500">{announcement.date}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{announcement.content}</p>
                <p className="text-xs text-slate-500 mt-1">By {announcement.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Grades</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Marks</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">{grade.courseName}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {grade.marks}/{grade.maxMarks}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{grade.feedback}</td>
                </tr>
              ))}
              {studentGrades.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-slate-500">
                    No grades available yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
