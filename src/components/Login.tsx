import { useState } from 'react';
import { LogIn, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { users } from '../data/dummyData';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<string>('Student');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { login } = useAuth();

  const roleUsers = users.filter(u => u.role === selectedRole);

  const handleLogin = () => {
    if (selectedUser) {
      const user = users.find(u => u.email === selectedUser);
      if (user) {
        login(user.email, user.role);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Course Management System
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Select your role to continue
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Student', 'Instructor', 'Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setSelectedUser('');
                  }}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    selectedRole === role
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Choose a user...</option>
              {roleUsers.map((user) => (
                <option key={user.id} value={user.email}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedUser}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Login to Dashboard
          </button>
        </div>

        <div className="mt-8 p-4 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600 text-center">
            This is a demo system with dummy data. Select any user to explore the features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
