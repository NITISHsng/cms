import { useState } from 'react';
import { FileText, Plus, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { materials as initialMaterials, courses } from '../../data/dummyData';
import { Material } from '../../types';

const InstructorMaterials = () => {
  const { currentUser } = useAuth();
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    courseId: '',
  });

  const instructorCourses = courses.filter(c => c.instructor === currentUser?.name);
  const instructorMaterials = materials.filter(m =>
    instructorCourses.some(c => c.id === m.courseId)
  );

  const handleCreate = () => {
    const newMaterial: Material = {
      id: Math.max(...materials.map(m => m.id)) + 1,
      courseId: parseInt(formData.courseId),
      title: formData.title,
      type: formData.type,
      uploadDate: new Date().toISOString().split('T')[0],
      file: `${formData.title.toLowerCase().replace(/\s+/g, '_')}.${formData.type.toLowerCase()}`,
    };
    setMaterials([...materials, newMaterial]);
    setShowModal(false);
    setFormData({ title: '', type: 'PDF', courseId: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Course Materials</h1>
          <p className="text-slate-600 mt-1">Upload and manage study materials</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Upload Material
        </button>
      </div>

      <div className="space-y-4">
        {instructorMaterials.map((material) => {
          const course = courses.find(c => c.id === material.courseId);
          return (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{material.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{course?.title} ({course?.code})</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {material.type}
                      </span>
                      <span>Uploaded: {material.uploadDate}</span>
                      <span>File: {material.file}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {instructorMaterials.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No materials uploaded yet</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Upload Material</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Course</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a course...</option>
                  {instructorCourses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Material Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Lecture Notes - Chapter 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Material Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PDF">PDF</option>
                  <option value="PPT">PowerPoint</option>
                  <option value="Video">Video</option>
                  <option value="Document">Document</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload File (Simulated)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to browse or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, PPT, DOC, Video files</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreate}
                  disabled={!formData.courseId || !formData.title}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Upload Material
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

export default InstructorMaterials;
