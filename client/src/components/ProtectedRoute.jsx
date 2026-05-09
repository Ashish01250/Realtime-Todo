import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminRequired = false }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // No session found 
  if (!user) return <Navigate to="/login" />;

  // Admin access check for Quality Lead workflows [cite: 21, 36]
  if (isAdminRequired && user.role !== 'Admin') {
    alert("Access Denied: Quality Lead credentials required.");
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;