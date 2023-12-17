import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        if (auth.user.id) {
          const userRole = await auth.getRole(auth.user.id);
          setRole(userRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, [auth.user.id, auth]);

  if (!auth.user.id) {
    return <Redirect to="/404" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (role === "1") {
    return children;
  } else {
    return <Redirect to="/404" />;
  }
}

export default ProtectedRoute;
