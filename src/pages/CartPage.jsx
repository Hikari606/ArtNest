import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, setOrderDetails } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setErrors({});
  };

  const normalizeIraqiPhone = (raw) => {
    if (!raw) return "";
    let s = raw.trim();
    // keep plus for country detection first, drop spaces/dashes/other
    s = s.replace(/[^\d+]/g, "");
    if (s.startsWith("+964")) {
      s = "0" + s.slice(4);
    } else if (s.startsWith("00964")) {
      s = "0" + s.slice(5);
    } else if (s.startsWith("964")) {
      s = "0" + s.slice(3);
    }
    // final digits only
    s = s.replace(/[^\d]/g, "");
    return s;
  };

  const validate = () => {
    const nextErrors = {};
    if (!fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!address.trim()) nextErrors.address = "Address is required";
    const normalized = normalizeIraqiPhone(phone);
    const iraqPattern = /^07(3|7|8|9)\d{8}$/; // 11 digits total
    if (!normalized) nextErrors.phone = "Phone is required";
    else if (!iraqPattern.test(normalized)) nextErrors.phone = "Enter a valid Iraqi number (073/077/078/079)";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const normalized = normalizeIraqiPhone(phone);
    const details = { fullName: fullName.trim(), address: address.trim(), phone: normalized };
    setOrderDetails(details);
    // create order
    addOrder({
      shopId: user?.shopId || "public",
      items: cart,
      total,
      status: "pending",
      customer: details,
      createdAt: new Date().toISOString(),
    });
    alert("Order placed! We will contact you soon.");
    clearCart();
    closeCheckout();
    setFullName("");
    setAddress("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-[#bf4b6a] text-center">Your Cart</h1>
        
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-12 text-lg">Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li 
                key={item.id} 
                className="flex justify-between items-center p-4 bg-[#fdf2f5] rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  {/* صورة العنصر */}
                  {item.img && (
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-200" />
                  )}
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-500 mt-1">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-[#bf4b6a] text-white px-4 py-2 rounded-xl hover:bg-[#d76b91] transition transform hover:-translate-y-1"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="text-xl font-semibold mt-6 text-right text-gray-800">Total: ${total.toFixed(2)}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={openCheckout}
            disabled={cart.length === 0}
            className={`px-6 py-3 rounded-xl text-white transition transform hover:-translate-y-1 ${
              cart.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#bf4b6a] hover:bg-[#d76b91]"
            }`}
          >
            Checkout
          </button>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#bf4b6a]">Checkout details</h2>
              <button onClick={closeCheckout} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={placeOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.fullName ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#f6a5b5]"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className={`mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.address ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#f6a5b5]"
                  }`}
                  placeholder="Street, city, etc."
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 ${
                    errors.phone ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-[#f6a5b5]"
                  }`}
                  placeholder="+964"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button type="button" onClick={closeCheckout} className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91]">
                  Place order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
