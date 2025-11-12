import { BookOpen, ClipboardList, Users, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { courses, assignments, submissions, announcements } from '../../data/dummyData';

const InstructorDashboard = () => {
  const { currentUser } = useAuth();

  const instructorCourses = courses.filter(c => c.instructor === currentUser?.name);
  const instructorAssignments = assignments.filter(a =>
    instructorCourses.some(c => c.id === a.courseId)
  );
  const pendingSubmissions = submissions.filter(s => !s.grade);
  const recentAnnouncements = announcements
    .filter(a => a.author === currentUser?.name)
    .slice(0, 3);

  const stats = [
    {
      title: 'My Courses',
      value: instructorCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Assignments',
      value: instructorAssignments.length,
      icon: ClipboardList,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Grading',
      value: pendingSubmissions.length,
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      title: 'My Announcements',
      value: recentAnnouncements.length,
      icon: Bell,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome, {currentUser?.name}!</h1>
        <p className="text-slate-600 mt-1">Instructor Dashboard</p>
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
          <h2 className="text-xl font-bold text-slate-800 mb-4">My Courses</h2>
          <div className="space-y-3">
            {instructorCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{course.title}</p>
                  <p className="text-sm text-slate-600">{course.code} - Semester {course.semester}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">{course.enrolledStudents} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Pending Submissions</h2>
          <div className="space-y-3">
            {pendingSubmissions.slice(0, 4).map((submission) => {
              const assignment = assignments.find(a => a.id === submission.assignmentId);
              return (
                <div key={submission.id} className="p-4 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-800">{assignment?.title}</p>
                  <p className="text-sm text-slate-600">{submission.studentName}</p>
                  <p className="text-xs text-slate-500 mt-1">Submitted: {submission.submittedDate}</p>
                </div>
              );
            })}
            {pendingSubmissions.length === 0 && (
              <p className="text-slate-500 text-center py-4">No pending submissions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
