import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    name: localStorage.getItem("name") || null,
  });

  // --- Cart functions ---
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // --- Auth functions ---
  const handleLogin = (token, role, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    setUser({ token, role, name });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser({ token: null, role: null, name: null });
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />
      <Routes>
        {/* Login/Signup */}
        {!user.token && <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />}
        
        {/* Customer pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />

        {/* Admin dashboard */}
        {user.role === "admin" && (
          <Route
            path="/admin"
            element={
              <ProtectedRoute roleRequired="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        )}

        {/* Redirect unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                user.role === "admin"
                  ? "/admin"
                  : user.token
                  ? "/"
                  : "/login"
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
