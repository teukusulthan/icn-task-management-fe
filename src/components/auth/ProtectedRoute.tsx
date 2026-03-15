import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();

  const email = localStorage.getItem("userEmail");

  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
