import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('access'); // Kiểm tra token trong localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
}