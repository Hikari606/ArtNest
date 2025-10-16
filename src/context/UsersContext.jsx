import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("users:data");
      const seed = [
        { id: "admin1", username: "admin", role: "admin", shopId: "shop-1", shopName: "Craft Corner", email: "admin@craftcorner.com", createdAt: new Date().toISOString() },
        { id: "admin2", username: "store2", role: "admin", shopId: "shop-2", shopName: "Artisan Hub", email: "admin@artisanhub.com", createdAt: new Date().toISOString() },
      ];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setUsers(parsed);
        else setUsers(seed);
      } else {
        setUsers(seed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("users:data", JSON.stringify(users));
    } catch (_) {}
  }, [users]);

  const addUser = (user) => {
    const withId = { ...user, id: user.id || `user_${Date.now()}` };
    setUsers((prev) => [withId, ...prev]);
    return withId;
  };

  const updateUser = (userId, fields) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...fields } : u)));
  };

  const removeUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const value = useMemo(() => ({ users, addUser, updateUser, removeUser }), [users]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = () => useContext(UsersContext);
