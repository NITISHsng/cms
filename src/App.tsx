import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import StudentDashboard from './components/student/StudentDashboard';
import StudentCourses from './components/student/StudentCourses';
import StudentMaterials from './components/student/StudentMaterials';
import StudentAssignments from './components/student/StudentAssignments';
import StudentGrades from './components/student/StudentGrades';
import InstructorDashboard from './components/instructor/InstructorDashboard';
import InstructorCourses from './components/instructor/InstructorCourses';
import InstructorMaterials from './components/instructor/InstructorMaterials';
import InstructorAssignments from './components/instructor/InstructorAssignments';
import InstructorSubmissions from './components/instructor/InstructorSubmissions';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import AdminCourses from './components/admin/AdminCourses';
import AdminReports from './components/admin/AdminReports';
import Announcements from './components/shared/Announcements';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [unauthPage, setUnauthPage] = useState<'landing' | 'login'>('landing');

  if (!currentUser) {
    return unauthPage === 'landing' ? (
      <LandingPage onLoginClick={() => setUnauthPage('login')} />
    ) : (
      <Login />
    );
  }

  const renderPage = () => {
    if (currentUser.role === 'Student') {
      switch (currentPage) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'courses':
          return <StudentCourses />;
        case 'materials':
          return <StudentMaterials />;
        case 'assignments':
          return <StudentAssignments />;
        case 'grades':
          return <StudentGrades />;
        case 'announcements':
          return <Announcements />;
        default:
          return <StudentDashboard />;
      }
    } else if (currentUser.role === 'Instructor') {
      switch (currentPage) {
        case 'dashboard':
          return <InstructorDashboard />;
        case 'courses':
          return <InstructorCourses />;
        case 'materials':
          return <InstructorMaterials />;
        case 'assignments':
          return <InstructorAssignments />;
        case 'submissions':
          return <InstructorSubmissions />;
        case 'announcements':
          return <Announcements />;
        default:
          return <InstructorDashboard />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <AdminUsers />;
        case 'courses':
          return <AdminCourses />;
        case 'reports':
          return <AdminReports />;
        case 'announcements':
          return <Announcements />;
        default:
          return <AdminDashboard />;
      }
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
