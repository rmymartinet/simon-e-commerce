import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFecthUserData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null);
  const { isAuthenticated, userId } = useAuth();

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`api/auth/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const userData = await res.json();

          setUserData(userData);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, userId]);

  return { userData };
};

export default useFecthUserData;
