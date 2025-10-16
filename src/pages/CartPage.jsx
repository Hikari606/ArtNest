import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
      </div>
    </div>
  );
}
