import { useState } from 'react';
import { ClipboardList, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { assignments as initialAssignments, courses } from '../../data/dummyData';
import { Assignment } from '../../types';

const InstructorAssignments = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxMarks: '',
    courseId: '',
  });

  const instructorCourses = courses.filter(c => c.instructor === currentUser?.name);
  const instructorAssignments = assignments.filter(a =>
    instructorCourses.some(c => c.id === a.courseId)
  );

  const handleCreate = () => {
    const newAssignment: Assignment = {
      id: Math.max(...assignments.map(a => a.id)) + 1,
      courseId: parseInt(formData.courseId),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      maxMarks: parseInt(formData.maxMarks),
      submitted: false,
    };
    setAssignments([...assignments, newAssignment]);
    setShowModal(false);
    setFormData({ title: '', description: '', dueDate: '', maxMarks: '', courseId: '' });
  };

  const handleUpdate = () => {
    if (editingAssignment) {
      setAssignments(assignments.map(a =>
        a.id === editingAssignment.id
          ? { ...a, ...formData, courseId: parseInt(formData.courseId), maxMarks: parseInt(formData.maxMarks) }
          : a
      ));
      setEditingAssignment(null);
      setShowModal(false);
      setFormData({ title: '', description: '', dueDate: '', maxMarks: '', courseId: '' });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const openEditModal = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxMarks: assignment.maxMarks.toString(),
      courseId: assignment.courseId.toString(),
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingAssignment(null);
    setFormData({ title: '', description: '', dueDate: '', maxMarks: '', courseId: '' });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Assignments</h1>
          <p className="text-slate-600 mt-1">Create and manage course assignments</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Create Assignment
        </button>
      </div>

      <div className="space-y-4">
        {instructorAssignments.map((assignment) => {
          const course = courses.find(c => c.id === assignment.courseId);
          return (
            <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">{assignment.title}</h3>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(assignment)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {instructorAssignments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No assignments yet. Create your first assignment!</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingAssignment ? 'Edit Assignment' : 'Create Assignment'}
              </h2>
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Assignment Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Project Report"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter assignment description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max Marks</label>
                  <input
                    type="number"
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 20"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingAssignment ? handleUpdate : handleCreate}
                  disabled={!formData.courseId || !formData.title || !formData.dueDate || !formData.maxMarks}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
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

export default InstructorAssignments;
