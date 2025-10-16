import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { OrdersProvider } from './context/OrdersContext';
import { ProductsProvider } from './context/ProductsContext';
import { UsersProvider } from './context/UsersContext';

const Protected = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <HomePage />;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
        <ProductsProvider>
        <UsersProvider>
          <Router>
          {/* Navbar ثابت لكل الصفحات */}
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/add-handmade" element={<Protected><AddHandmadePage /></Protected>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/image/:id" element={<ImageDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/artnest" element={<ArtNestPage />} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          </Router>
        </UsersProvider>
        </ProductsProvider>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
