export const checkAuthStatus = async () => {
  try {
    const res = await fetch("/api/auth/check-auth");
    const data = await res.json();
    return {
      isAuthenticated: data.isAuthenticated,
      userId: data.user,
    };
  } catch (error) {
    console.error("Failed to check authentication:", error);
    throw error;
  }
};
