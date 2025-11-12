import { useState } from 'react';
import { ClipboardList, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { assignments as initialAssignments, courses, enrollments } from '../../data/dummyData';
import { Assignment } from '../../types';

const StudentAssignments = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);

  const enrolledCourseIds = enrollments
    .filter(e => e.studentId === currentUser?.id)
    .map(e => e.courseId);

  const studentAssignments = assignments.filter(a => enrolledCourseIds.includes(a.courseId));

  const handleSubmit = (assignmentId: number) => {
    setAssignments(assignments.map(a =>
      a.id === assignmentId ? { ...a, submitted: true } : a
    ));
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (assignment: Assignment) => {
    if (assignment.submitted) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4" />
          Submitted
        </span>
      );
    }
    const daysLeft = getDaysRemaining(assignment.dueDate);
    if (daysLeft < 0) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
          <AlertCircle className="w-4 h-4" />
          Overdue
        </span>
      );
    }
    if (daysLeft <= 3) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
          <Clock className="w-4 h-4" />
          Due Soon
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        <Clock className="w-4 h-4" />
        Pending
      </span>
    );
  };

  const pendingAssignments = studentAssignments.filter(a => !a.submitted);
  const submittedAssignments = studentAssignments.filter(a => a.submitted);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Assignments</h1>
        <p className="text-slate-600 mt-1">View and submit your course assignments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Total Assignments</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{studentAssignments.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Pending</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{pendingAssignments.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Submitted</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{submittedAssignments.length}</p>
        </div>
      </div>

      {pendingAssignments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Pending Assignments</h2>
          <div className="space-y-4">
            {pendingAssignments.map((assignment) => {
              const course = courses.find(c => c.id === assignment.courseId);
              const daysLeft = getDaysRemaining(assignment.dueDate);
              return (
                <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">{assignment.title}</h3>
                        {getStatusBadge(assignment)}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                      <p className="text-sm text-slate-600 mb-3">{assignment.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-600">
                          <span className="font-medium">Due:</span> {assignment.dueDate}
                        </span>
                        <span className="text-slate-600">
                          <span className="font-medium">Max Marks:</span> {assignment.maxMarks}
                        </span>
                        {daysLeft >= 0 && (
                          <span className={`font-medium ${daysLeft <= 3 ? 'text-orange-600' : 'text-blue-600'}`}>
                            {daysLeft} days remaining
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSubmit(assignment.id)}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    Submit Assignment
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {submittedAssignments.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Submitted Assignments</h2>
          <div className="space-y-4">
            {submittedAssignments.map((assignment) => {
              const course = courses.find(c => c.id === assignment.courseId);
              return (
                <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800">{assignment.title}</h3>
                        {getStatusBadge(assignment)}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                      <p className="text-sm text-slate-600 mb-3">{assignment.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-600">
                          <span className="font-medium">Due:</span> {assignment.dueDate}
                        </span>
                        <span className="text-slate-600">
                          <span className="font-medium">Max Marks:</span> {assignment.maxMarks}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {studentAssignments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No assignments found</p>
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
