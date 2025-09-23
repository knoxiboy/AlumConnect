import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser, hasRole } from '../utils/auth';

export default function ProtectedRoute({ role }) {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/alumni-auth" />;
  }
  
  if (role && !hasRole(role)) {
    return <Navigate to="/landing" />;
  }
  
  return <Outlet />;
}
