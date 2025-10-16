import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { imageData } from "../data/imageData";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("products:data");
      const imgs = [
        imageData?.[0]?.src,
        imageData?.[1]?.src,
        imageData?.[2]?.src,
        imageData?.[3]?.src,
        imageData?.[4]?.src,
      ];
      const placeholder = "https://via.placeholder.com/80x80.png?text=Item";
      const pick = (i) => (typeof imgs[i] === "string" && imgs[i] ? imgs[i] : placeholder);
      const seed = [
        { id: "p1", shopId: "shop-1", name: "Handmade Mug", price: 15, stock: 12, img: pick(0) },
        { id: "p2", shopId: "shop-1", name: "Wool Scarf", price: 25, stock: 7, img: pick(1) },
        { id: "p3", shopId: "shop-2", name: "Clay Vase", price: 30, stock: 4, img: pick(2) },
        { id: "p4", shopId: "shop-1", name: "Leather Wallet", price: 20, stock: 10, img: pick(3) },
        { id: "p5", shopId: "shop-1", name: "Beaded Bracelet", price: 10, stock: 25, img: pick(4) },
      ];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
        else setProducts(seed);
      } else {
        setProducts(seed);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("products:data", JSON.stringify(products));
    } catch (_) {}
  }, [products]);

  const addProduct = (product) => {
    const withId = { ...product, id: product.id || `prod_${Date.now()}` };
    setProducts((prev) => [withId, ...prev]);
    return withId;
  };

  const updateStock = (productId, delta) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, (p.stock || 0) + delta) } : p)));
  };

  const updateProduct = (productId, fields) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...fields } : p)));
  };

  const value = useMemo(() => ({ products, addProduct, updateStock, updateProduct }), [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = () => useContext(ProductsContext);


