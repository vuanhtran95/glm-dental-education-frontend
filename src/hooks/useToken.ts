import { useState, useEffect } from "react";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const updateToken = (newToken: string | null): void => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { token, updateToken };
};