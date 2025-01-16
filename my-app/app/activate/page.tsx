"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ActivatePage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Récupérer le token depuis l'URL
  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "password"
  >("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch(`/api/activate_account?token=${token}`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.message === "Account activated successfully") {
          setStatus("password");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error activating account:", error);
        setStatus("error");
      }
    };

    activateAccount();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`/api/activate_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.message === "Account activated and password set successfully.") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error setting password:", error);
      setStatus("error");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "password") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Set Password</button>
        </form>
      </div>
    );
  }

  if (status === "success") {
    return <p>Account activated and password set successfully!</p>;
  }

  if (status === "error") {
    return <p>Error activating account. Please try again.</p>;
  }

  return null;
};

export default ActivatePage;
