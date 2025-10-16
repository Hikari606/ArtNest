import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("auth:user");
      if (saved) {
        const parsed = JSON.parse(saved);
        setIsAuthenticated(true);
        setUser(parsed);
      }
    } catch (_) {
      // ignore
    }
  }, []);

  const login = (username, password) => {
    if (!username || !password) return false;
    // Demo accounts: simple in-memory map
    const accounts = {
      admin: { password: "admin123", role: "admin", shopId: "shop-1" },
      superadmin: { password: "super123", role: "superadmin", shopId: null },
    };
    const record = accounts[username.toLowerCase()];
    if (!record || record.password !== password) return false;
    const userData = { username, role: record.role, shopId: record.shopId };
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem("auth:user", JSON.stringify(userData));
    } catch (_) {
      // ignore
    }
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem("auth:user");
    } catch (_) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


