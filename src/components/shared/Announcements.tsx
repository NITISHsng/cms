import { useState } from 'react';
import { Bell, Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { announcements as initialAnnouncements, courses, enrollments } from '../../data/dummyData';
import { Announcement } from '../../types';

const Announcements = () => {
  const { currentUser } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    courseId: '',
    isSystemWide: false,
  });

  const canCreateAnnouncement = currentUser?.role === 'Instructor' || currentUser?.role === 'Admin';

  const getRelevantAnnouncements = () => {
    if (currentUser?.role === 'Admin' || currentUser?.role === 'Instructor') {
      return announcements;
    }
    const enrolledCourseIds = enrollments
      .filter(e => e.studentId === currentUser?.id)
      .map(e => e.courseId);
    return announcements.filter(
      a => a.isSystemWide || (a.courseId && enrolledCourseIds.includes(a.courseId))
    );
  };

  const instructorCourses = currentUser?.role === 'Instructor'
    ? courses.filter(c => c.instructor === currentUser.name)
    : [];

  const handleCreate = () => {
    const announcement: Announcement = {
      id: announcements.length + 1,
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      author: currentUser?.name || '',
      date: new Date().toISOString().split('T')[0],
      courseId: newAnnouncement.courseId ? parseInt(newAnnouncement.courseId) : undefined,
      isSystemWide: currentUser?.role === 'Admin' ? newAnnouncement.isSystemWide : false,
    };
    setAnnouncements([announcement, ...announcements]);
    setShowModal(false);
    setNewAnnouncement({ title: '', content: '', courseId: '', isSystemWide: false });
  };

  const relevantAnnouncements = getRelevantAnnouncements();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Announcements</h1>
          <p className="text-slate-600 mt-1">Stay updated with course and system announcements</p>
        </div>
        {canCreateAnnouncement && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Announcement
          </button>
        )}
      </div>

      <div className="space-y-4">
        {relevantAnnouncements.map((announcement) => {
          const course = announcement.courseId ? courses.find(c => c.id === announcement.courseId) : null;
          return (
            <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${announcement.isSystemWide ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  <Bell className={`w-6 h-6 ${announcement.isSystemWide ? 'text-purple-600' : 'text-blue-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-1">{announcement.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="font-medium">{announcement.author}</span>
                        <span>•</span>
                        <span>{announcement.date}</span>
                        {course && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600">{course.title}</span>
                          </>
                        )}
                        {announcement.isSystemWide && (
                          <>
                            <span>•</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                              System-wide
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{announcement.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {relevantAnnouncements.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No announcements available</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Create Announcement</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement content"
                />
              </div>
              {currentUser?.role === 'Instructor' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Course (Optional)</label>
                  <select
                    value={newAnnouncement.courseId}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, courseId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All my courses</option>
                    {instructorCourses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              )}
              {currentUser?.role === 'Admin' && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="systemWide"
                    checked={newAnnouncement.isSystemWide}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, isSystemWide: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="systemWide" className="text-sm text-slate-700">
                    System-wide announcement
                  </label>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreate}
                  disabled={!newAnnouncement.title || !newAnnouncement.content}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Create Announcement
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

export default Announcements;
