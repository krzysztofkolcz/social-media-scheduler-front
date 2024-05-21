import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useLocation,
  Outlet
} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute  = ({children}: { children: React.ReactNode }) : JSX.Element => {
  const { isLoggedIn, logged } = useAuth();

  console.log("Protected route.")
  console.log("Is logged in:"+isLoggedIn())
  if (!isLoggedIn()) {
    console.log("Protected route redirect to login.")
    return <Navigate to="/login" replace />;
  }

  console.log("Protected route no redirection.")
  return (<>{children}</>);
};