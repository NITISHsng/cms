import { useState } from 'react';
import { FileText, Download, Search, Video, File } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { materials, courses, enrollments } from '../../data/dummyData';

const StudentMaterials = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const enrolledCourseIds = enrollments
    .filter(e => e.studentId === currentUser?.id)
    .map(e => e.courseId);

  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const filteredMaterials = materials
    .filter(m => enrolledCourseIds.includes(m.courseId))
    .filter(m => selectedCourse === 'all' || m.courseId === parseInt(selectedCourse))
    .filter(m =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes('video')) return Video;
    if (type.toLowerCase().includes('pdf')) return FileText;
    return File;
  };

  const getTypeColor = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('pdf')) return 'bg-red-100 text-red-700';
    if (lower.includes('ppt')) return 'bg-orange-100 text-orange-700';
    if (lower.includes('video')) return 'bg-purple-100 text-purple-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Course Materials</h1>
        <p className="text-slate-600 mt-1">Access study materials and resources</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Courses</option>
            {enrolledCourses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredMaterials.map((material) => {
          const course = courses.find(c => c.id === material.courseId);
          const Icon = getIcon(material.type);
          return (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{material.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className={`px-3 py-1 rounded-full font-medium ${getTypeColor(material.type)}`}>
                        {material.type}
                      </span>
                      <span>Uploaded: {material.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No materials found</p>
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
