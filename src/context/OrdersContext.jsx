import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("orders:data");
      const seed = [
          {
            id: "ord_1001",
            shopId: "shop-1",
            items: [
              { id: "p1", name: "Handmade Mug", price: 15 },
              { id: "p2", name: "Wool Scarf", price: 25 },
            ],
            total: 40,
            status: "pending",
            customer: { fullName: "Ali Hassan", phone: "07701234567", address: "Baghdad" },
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          },
          {
            id: "ord_1002",
            shopId: "shop-2",
            items: [
              { id: "p3", name: "Clay Vase", price: 30 },
            ],
            total: 30,
            status: "processing",
            customer: { fullName: "Sara Ahmed", phone: "07809876543", address: "Basra" },
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          },
          {
            id: "ord_1003",
            shopId: "shop-1",
            items: [
              { id: "p4", name: "Leather Wallet", price: 20 },
              { id: "p5", name: "Beaded Bracelet", price: 10 },
            ],
            total: 30,
            status: "fulfilled",
            customer: { fullName: "Omar Ali", phone: "07901112233", address: "Erbil" },
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          },
        ];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        } else {
          setOrders(seed);
        }
      } else {
        setOrders(seed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("orders:data", JSON.stringify(orders));
    } catch (_) {}
  }, [orders]);

  const addOrder = (order) => {
    const withId = { ...order, id: order.id || `ord_${Date.now()}` };
    setOrders((prev) => [withId, ...prev]);
    return withId;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const value = useMemo(
    () => ({ orders, addOrder, updateOrderStatus }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => useContext(OrdersContext);


