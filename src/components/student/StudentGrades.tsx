import { Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { grades } from '../../data/dummyData';

const StudentGrades = () => {
  const { currentUser } = useAuth();

  const studentGrades = grades.filter(g => g.studentId === currentUser?.id);

  const totalMarks = studentGrades.reduce((sum, g) => sum + g.marks, 0);
  const totalMaxMarks = studentGrades.reduce((sum, g) => sum + g.maxMarks, 0);
  const averagePercentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(1) : 0;

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 80) return 'text-blue-600 bg-blue-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    if (percentage >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">My Grades</h1>
        <p className="text-slate-600 mt-1">View your academic performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Assignments</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{studentGrades.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Average Score</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{averagePercentage}%</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Overall Grade</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{getGradeLetter(Number(averagePercentage))}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Grade Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Course</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Marks Obtained</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Max Marks</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Percentage</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Grade</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => {
                const percentage = (grade.marks / grade.maxMarks) * 100;
                return (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-800">{grade.courseName}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-semibold text-slate-800">{grade.marks}</span>
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600">{grade.maxMarks}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-semibold text-slate-800">{percentage.toFixed(1)}%</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(percentage)}`}>
                        {getGradeLetter(percentage)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{grade.feedback}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {studentGrades.length === 0 && (
          <div className="p-12 text-center">
            <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No grades available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGrades;
