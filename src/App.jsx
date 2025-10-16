import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import StoresPage from "./pages/StoresPage";
import ItemsPage from "./pages/ItemsPage";
import AddHandmadePage from "./pages/AddHandmadePage";
import AboutPage from "./pages/AboutPage";
import ImageDetail from "./pages/ImageDetail";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ArtNestPage from './pages/ArtNestPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        {/* Navbar ثابت لكل الصفحات */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/add-handmade" element={<AddHandmadePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/image/:id" element={<ImageDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/artnest" element={<ArtNestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
