import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute  = ({children}: { children: React.ReactNode }) : JSX.Element => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn()){
    console.log("Protected route. User NOT loggedId")
    return <Navigate to="/login" replace />;
  }
  console.log("Protected route. User oggedId")
  return (<>{children}</>);
};