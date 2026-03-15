import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      setAuthenticated(true);
    }

    setChecking(false);
  }, []);

  if (checking) return null;

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
