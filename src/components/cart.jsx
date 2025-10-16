import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some handmade items to your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      <div className="space-y-4">
        {cart.map((item, idx) => (
          <div key={item.id || idx} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{item.name || `Item ${idx + 1}`}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => removeFromCart(item.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
