import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';
import { users, courses, assignments, submissions } from '../../data/dummyData';

const AdminDashboard = () => {
  const totalStudents = users.filter(u => u.role === 'Student').length;
  const totalInstructors = users.filter(u => u.role === 'Instructor').length;
  const totalCourses = courses.length;
  const totalAssignments = assignments.length;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Instructors',
      value: totalInstructors,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Total Assignments',
      value: totalAssignments,
      icon: ClipboardList,
      color: 'bg-orange-500',
    },
  ];

  const courseStats = courses.map(course => ({
    name: course.code,
    students: course.enrolledStudents || 0,
  }));

  const submissionStats = submissions.reduce((acc, sub) => {
    const graded = sub.grade ? 1 : 0;
    const pending = sub.grade ? 0 : 1;
    return {
      graded: acc.graded + graded,
      pending: acc.pending + pending,
    };
  }, { graded: 0, pending: 0 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">System overview and statistics</p>
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
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Course Enrollment Stats</h2>
          </div>
          <div className="space-y-3">
            {courseStats.map((course) => (
              <div key={course.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-800">{course.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((course.students / 60) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 w-16 text-right">
                    {course.students} students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-slate-800">Submission Overview</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 font-medium mb-1">Graded Submissions</p>
              <p className="text-3xl font-bold text-green-800">{submissionStats.graded}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-700 font-medium mb-1">Pending Grading</p>
              <p className="text-3xl font-bold text-orange-800">{submissionStats.pending}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-1">Total Submissions</p>
              <p className="text-3xl font-bold text-blue-800">{submissions.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-800">3 new students enrolled</p>
              <p className="text-sm text-slate-500">Database Management Systems</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-lg">
              <ClipboardList className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-slate-800">5 assignments submitted</p>
              <p className="text-sm text-slate-500">Various courses</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-slate-800">2 new courses created</p>
              <p className="text-sm text-slate-500">By instructors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
