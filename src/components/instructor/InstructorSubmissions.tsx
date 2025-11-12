import { useState } from 'react';
import { Award, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submissions as initialSubmissions, assignments, courses } from '../../data/dummyData';
import { Submission } from '../../types';

const InstructorSubmissions = () => {
  const { currentUser } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });

  const instructorCourses = courses.filter(c => c.instructor === currentUser?.name);
  const instructorAssignments = assignments.filter(a =>
    instructorCourses.some(c => c.id === a.courseId)
  );
  const instructorSubmissions = submissions.filter(s =>
    instructorAssignments.some(a => a.id === s.assignmentId)
  );

  const handleGrade = () => {
    if (selectedSubmission) {
      setSubmissions(submissions.map(s =>
        s.id === selectedSubmission.id
          ? { ...s, grade: parseInt(gradeData.grade), feedback: gradeData.feedback }
          : s
      ));
      setShowModal(false);
      setSelectedSubmission(null);
      setGradeData({ grade: '', feedback: '' });
    }
  };

  const openGradeModal = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGradeData({
      grade: submission.grade?.toString() || '',
      feedback: submission.feedback || '',
    });
    setShowModal(true);
  };

  const pendingSubmissions = instructorSubmissions.filter(s => !s.grade);
  const gradedSubmissions = instructorSubmissions.filter(s => s.grade);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Student Submissions</h1>
        <p className="text-slate-600 mt-1">Review and grade student assignments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Total Submissions</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{instructorSubmissions.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Pending Grading</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{pendingSubmissions.length}</p>
        </div>
      </div>

      {pendingSubmissions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Pending Grading</h2>
          <div className="space-y-4">
            {pendingSubmissions.map((submission) => {
              const assignment = assignments.find(a => a.id === submission.assignmentId);
              const course = courses.find(c => c.id === assignment?.courseId);
              return (
                <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1">{assignment?.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-600">
                          <span className="font-medium">Student:</span> {submission.studentName}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">Submitted:</span> {submission.submittedDate}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">File:</span> {submission.file}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">Max Marks:</span> {assignment?.maxMarks}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openGradeModal(submission)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Award className="w-4 h-4" />
                      Grade
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {gradedSubmissions.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Graded Submissions</h2>
          <div className="space-y-4">
            {gradedSubmissions.map((submission) => {
              const assignment = assignments.find(a => a.id === submission.assignmentId);
              const course = courses.find(c => c.id === assignment?.courseId);
              return (
                <div key={submission.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-slate-800">{assignment?.title}</h3>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4" />
                          Graded
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-slate-600">
                          <span className="font-medium">Student:</span> {submission.studentName}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">Submitted:</span> {submission.submittedDate}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">Grade:</span> {submission.grade}/{assignment?.maxMarks}
                        </p>
                        <p className="text-slate-600">
                          <span className="font-medium">Feedback:</span> {submission.feedback}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openGradeModal(submission)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                    >
                      <Award className="w-4 h-4" />
                      Re-grade
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {instructorSubmissions.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No submissions yet</p>
        </div>
      )}

      {showModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Grade Submission</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Student:</span> {selectedSubmission.studentName}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Assignment:</span> {assignments.find(a => a.id === selectedSubmission.assignmentId)?.title}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Submitted:</span> {selectedSubmission.submittedDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Grade (Max: {assignments.find(a => a.id === selectedSubmission.assignmentId)?.maxMarks})
                </label>
                <input
                  type="number"
                  value={gradeData.grade}
                  onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter marks"
                  max={assignments.find(a => a.id === selectedSubmission.assignmentId)?.maxMarks}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Feedback</label>
                <textarea
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter feedback for the student"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleGrade}
                  disabled={!gradeData.grade || !gradeData.feedback}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Submit Grade
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSubmissions;
