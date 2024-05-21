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

export const RequireAuthRoute = () => {
  const { logged, isLoggedIn, getSession, userSession } = useAuth();
  const location = useLocation();

  console.log("Require auth route.")
  console.log("Logged:"+logged)
  console.log("Is logged in:"+isLoggedIn())
  console.log("Require auth route. getSession:")
  console.log(getSession())
  console.log("Require auth route. userSession:")
  console.log(userSession)
  return (
    userSession? <Outlet /> : <Navigate to="/login"  state={{ from:location }} replace />

  );
};