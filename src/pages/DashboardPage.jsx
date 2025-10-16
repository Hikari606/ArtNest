import React, { useMemo, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useProducts } from "../context/ProductsContext";
import { useUsers } from "../context/UsersContext";

// Using actual app contexts and data

export default function DashboardPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const { products, updateStock, addProduct } = useProducts();
  const { users, addUser, updateUser, removeUser } = useUsers();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", img: "" });
  const [newUser, setNewUser] = useState({ username: "", email: "", shopName: "" });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const myOrders = useMemo(() => {
    if (!user) return [];
    if (user.role === "superadmin") return orders;
    if (user.role === "admin") return orders.filter((o) => o.shopId === user.shopId);
    return [];
  }, [orders, user]);
  const totalRevenue = myOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingCount = myOrders.filter((o) => o.status === "pending").length;
  const fulfilledCount = myOrders.filter((o) => o.status === "fulfilled").length;
  const myProducts = useMemo(() => {
    if (!user) return [];
    if (user.role === "superadmin") return products;
    if (user.role === "admin") return products.filter((p) => p.shopId === user.shopId);
    return [];
  }, [products, user]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return myOrders;
    return myOrders.filter((o) => o.status === statusFilter);
  }, [myOrders, statusFilter]);

  // updateStock and addProduct come from ProductsContext

  const statusEmoji = {
    pending: "⏳",
    processing: "🔄",
    fulfilled: "✅",
    cancelled: "❌",
  };

  const exportOrdersExcel = () => {
    const rows = myOrders.map((o) => ({
      id: o.id,
      shopId: o.shopId,
      status: o.status,
      total: o.total || 0,
      customerName: o.customer?.fullName || "",
      phone: o.customer?.phone || "",
      createdAt: o.createdAt,
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const wbout = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "orders.xlsx");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] p-6 flex flex-col items-center">
        <div className={`w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-3xl font-extrabold mb-6 text-[#bf4b6a] text-center">Dashboard</h1>

        {/* Super Admin - User Management Only */}
        {user?.role === "superadmin" ? (
          <div className="rounded-3xl p-6 border border-[#f3e1e6] bg-white">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#bf4b6a]">User Management</h2>
              <button
                onClick={() => setIsAddUserOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91]"
              >
                Add User
              </button>
            </div>
            
            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-[#fff7fb]">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Username</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Email</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Store Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Role</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{u.username}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.shopName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{u.role}</td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => removeUser(u.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            {/* Regular Admin - Orders and Stock Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl border border-[#ffe6e0] bg-[#fff7fb]">
                <div className="text-sm text-gray-600">Total Orders</div>
                <div className="text-2xl font-bold text-[#bf4b6a]">{myOrders.length}</div>
              </div>
              <div className="p-4 rounded-2xl border border-[#bde0fe] bg-[#f0f6ff]">
                <div className="text-sm text-gray-600">Revenue</div>
                <div className="text-2xl font-bold text-[#3b82f6]">${totalRevenue.toFixed(2)}</div>
              </div>
              <div className="p-4 rounded-2xl border border-[#ffe6e0] bg-[#fff7fb]">
                <div className="text-sm text-gray-600">Pending</div>
                <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
              </div>
              <div className="p-4 rounded-2xl border border-[#d0f0c0] bg-[#f3fbf0]">
                <div className="text-sm text-gray-600">Fulfilled</div>
                <div className="text-2xl font-bold text-emerald-600">{fulfilledCount}</div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="rounded-3xl p-6 border border-[#f3e1e6] bg-[#fff7fb] mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-[#bf4b6a]">Orders</h2>
                <div className="flex items-center gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[#ffdbe6] bg-white text-gray-700"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button onClick={exportOrdersExcel} className="px-4 py-2 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91]">Export Excel</button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredOrders.map((o, i) => (
                  <li key={o.id} className="p-4 bg-white rounded-2xl border border-[#f3e1e6] shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-gray-800">Order {o.id}</div>
                        <div className="text-sm text-gray-600">Customer: {o.customer?.fullName} • {o.customer?.phone}</div>
                        <div className="text-sm text-gray-600">Items: {o.items?.length || 0} • Total: ${o.total?.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm border ${
                          o.status === "pending" ? "bg-yellow-50 border-yellow-200 text-yellow-800" :
                          o.status === "processing" ? "bg-blue-50 border-blue-200 text-blue-800" :
                          o.status === "fulfilled" ? "bg-green-50 border-green-200 text-green-800" :
                          "bg-red-50 border-red-200 text-red-800"
                        }`}>
                          {statusEmoji[o.status]} {o.status}
                        </span>
                        <select
                          value={o.status}
                          onChange={(e) => {/* integrate with real update if needed */}}
                          className="rounded-xl border px-3 py-1"
                        >
                          <option value="pending">pending</option>
                          <option value="processing">processing</option>
                          <option value="fulfilled">fulfilled</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="rounded-3xl p-6 border border-[#bde0fe] bg-white">
              <h2 className="text-2xl font-bold text-[#3b82f6] mb-6">Stock Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {myProducts.map((product, i) => (
                   <div key={product.id} className="p-4 bg-[#f8fbff] rounded-2xl border border-[#e5f0ff]">
                    <div className="flex items-center gap-4">
                       <img src={product.img} alt={product.name} className="w-20 h-20 rounded-xl object-cover border border-[#e5f0ff]" />
                      <div className="flex-1">
                         <h3 className="text-gray-800 font-semibold text-lg mb-1">{product.name}</h3>
                         <p className="text-gray-600 text-sm mb-2">
                           <span className="text-[#bf4b6a] font-semibold">${product.price}</span> • Stock: <span className={product.stock < 20 ? "text-amber-600" : "text-emerald-600"}>{product.stock}</span>
                         </p>
                        <div className="flex gap-2">
                           <button onClick={() => updateStock(product.id, -1)} className="px-3 py-2 rounded-xl border border-[#ffdbe6] bg-white text-[#bf4b6a] hover:bg-[#ffe6e0]">-</button>
                           <button onClick={() => updateStock(product.id, 1)} className="px-3 py-2 rounded-xl border border-[#d0f0c0] bg-white text-emerald-600 hover:bg-[#f3fbf0]">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

               {/* Add Product Form */}
               <div className="rounded-2xl p-5 border border-[#ffe6e0] bg-[#fff7fb]">
                <h3 className="text-[#bf4b6a] font-bold text-lg mb-4">Add New Product</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400"
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400"
                    placeholder="Stock"
                  />
                  <input
                    type="url"
                    value={newProduct.img}
                    onChange={(e) => setNewProduct({ ...newUser, img: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400"
                    placeholder="Image URL"
                  />
                  <button
                    onClick={() => {
                      if (!newProduct.name || !newProduct.price) return;
                      addProduct({
                        name: newProduct.name,
                        price: Number(newProduct.price),
                        stock: Number(newProduct.stock || 0),
                        shopId: user?.role === "admin" ? user.shopId : "shop-1",
                        img: newProduct.img || "https://via.placeholder.com/80x80.png?text=Item",
                      });
                      setNewProduct({ name: "", price: "", stock: "", img: "" });
                    }}
                    className="px-6 py-3 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91]"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-4 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#bf4b6a]">Add New Admin</h2>
              <button 
                onClick={() => setIsAddUserOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newUser.username || !newUser.email || !newUser.shopName) return;
              addUser({
                username: newUser.username,
                email: newUser.email,
                shopName: newUser.shopName,
                shopId: `shop-${Date.now()}`, // Auto-generate shop ID
                role: "admin",
                createdAt: new Date().toISOString(),
              });
              setNewUser({ username: "", email: "", shopName: "" });
              setIsAddUserOpen(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={newUser.shopName}
                  onChange={(e) => setNewUser({ ...newUser, shopName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#ffdbe6] bg-white text-gray-700 placeholder-gray-400 focus:border-[#bf4b6a] focus:ring-2 focus:ring-[#ffe6e0]"
                  placeholder="Enter store name"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#bf4b6a] text-white hover:bg-[#d76b91] transition-colors"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}