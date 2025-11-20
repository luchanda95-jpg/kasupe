// src/context/UserAuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext(null);

export function UserAuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("kasupe_user_token");
    const u = localStorage.getItem("kasupe_user");
    if (t) setToken(t);
    if (u) setUser(JSON.parse(u));
    setLoading(false);
  }, []);

  const login = (token, user) => {
    localStorage.setItem("kasupe_user_token", token);
    localStorage.setItem("kasupe_user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("kasupe_user_token");
    localStorage.removeItem("kasupe_user");
    setToken(null);
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useUserAuth = () => useContext(UserAuthContext);
