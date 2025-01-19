import { UserDataProps } from "@/types/types";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserDataProps>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = fetch("/api/auth/check-auth", {
          method: "GET",
        });

        const data = await (await response).json();

        if (!data) {
          setIsAuthenticated(false);
        }

        console.log("data", data);

        setIsAuthenticated(data.isAuthenticated);
        setUserData(data.userData);
      } catch (error) {
        console.log("Failed to verify session", error);
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated, userData };
};

export default useAuth;
