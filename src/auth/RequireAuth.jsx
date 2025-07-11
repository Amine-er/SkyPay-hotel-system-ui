import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  const userRoles = user?.realm_access?.roles || [];
  const hasRole = allowedRoles.some((role) => userRoles.includes(role));

  return hasRole ? children : <Navigate to="/signin" replace />;
};

export default RequireAuth;
