import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import useAccount from '../hooks/useAccount';

export const ProtectedRoute  = ({children}: { children: React.ReactNode }) : JSX.Element => {
  const { isLoggedIn } = useAccount();

  console.log("Protected route.")
  console.log("Is logged in:"+isLoggedIn())
  if (!isLoggedIn()) {
    console.log("Protected route redirect to login.")
    return <Navigate to="/login" replace />;
  }

  console.log("Protected route no redirection.")
  return (<>{children}</>);
};