import { useAuth } from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  const userRoles = user?.realm_access?.roles || [];
  const hasRole = allowedRoles.some((role) => userRoles.includes(role));
  return hasRole ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
