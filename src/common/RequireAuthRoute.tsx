import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const RequireAuthRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return (
    isLoggedIn() ? <Outlet /> : <Navigate to="/login"  state={{ from:location }} replace />
  );
};