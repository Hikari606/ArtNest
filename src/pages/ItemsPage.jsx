// src/pages/ItemsPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ألوان المتاجر
const storeColors = {
  "نجمة": "bg-indigo-100",
  "ɪɴᴀɴɴᴀ ғᴀɪʀʏ sᴛᴏʀᴇ": "bg-teal-100",
  "Pearly": "bg-pink-100",
  "trend stor": "bg-yellow-100",
  "Inanna art": "bg-blue-100",
  "Roan handmade": "bg-blue-200",
  "Perle Handmade": "bg-blue-300",
  "Tomi shop": "bg-rose-100",
  "Bubble Mades": "bg-rose-200",
  "Lamsa for crochet": "bg-rose-300",
  "Bunny nails": "bg-violet-100",
  "Jelly Nails": "bg-violet-200",
  "Artecharm": "bg-lime-100",
  "Tarchya": "bg-lime-200",
  "Qaws Qazah": "bg-lime-300",
  "Lelo Candles": "bg-amber-100",
  "Coco store": "bg-amber-200",
  "شموع گاردينيا": "bg-amber-300",
  "cocanat candles": "bg-amber-400",
  "Art By Nsm": "bg-sky-100",
  "Noon Art": "bg-sky-300",
  "Dreamy Dolls": "bg-gray-100",
  "Mary Land": "bg-gray-100",
  "NECLA DESIGN": "bg-gray-200",
  "master shop": "bg-gray-300",
  "صنعة": "bg-gray-400",
  "safa store": "bg-gray-500"
};

// بيانات المتاجر
const allItems = {
  // Jewelry
  "نجمة": [
    { id: 1, name: "Pendant A", price: 15, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHu2_0WrNssUDcwCeHy4-4gGcD7CRNAyq8Ig&s" },
    { id: 2, name: "Keychain B", price: 8, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Ring C", price: 22, img: "https://via.placeholder.com/150" },
  ],
  "ɪɴᴀɴɴᴀ ғᴀɪʀʏ sᴛᴏʀᴇ": [
     { id: 1, price: 12, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHu2_0WrNssUDcwCeHy4-4gGcD7CRNAyq8Ig&s" },
    { id: 2, price: 18, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCxUc-G0kGvIXHr9GyUvduII24NYdi5M40mQ&s" },
    { id: 3, price: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ZWiK7zBJYRCgS9pM8eN1hHycblms9i3xiw&s" },
    { id: 4, price: 14, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzIhf3gMhs1GJkeSZ6F2EwaKxOiUQv6BCosQ&s" },
    { id: 5, price: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD7Pz0vAsb5Cy-GAILjsqbsgwVaW-MOj3_lw&s" },
    { id: 6, price: 10, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKucdDLiOJqWwD9gV5tDPrU4P2y-xfz81YQ&s" },
  ],
  "Pearly": [
     { id: 1, price: 11, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWehS6sjKBJ5nCTiSJ8cm3BBlpwhO-hPyEZQ&s" },
    { id: 2, price: 15, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVx4nKXb6MvI_tcaHbydOkASIt0HuiRSn91Q&s" },
    { id: 3, price: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntS9Cel1e6mX0O82Mw-Z-4nddZxnJ4XaK3w&s" },
    { id: 4, price: 20, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJiw3XBVy39bQ1_o8nNJzTQBJS3xRauA5nQA&s" },
    { id: 5, price: 13, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGe9yaaa6a7UAfImYCmFToBsYZaM-FroNEGA&s" },
  ],
  // Jewelry Materials
  "trend stor": [
    { id: 1, name: "Beads Set", price: 7, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Chains Pack", price: 12, img: "https://via.placeholder.com/150" },
  ],
  // Embroidery
  "Inanna art": [
    { id: 1, name: "Handmade Patch", price: 9, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Decorative Stitch", price: 14, img: "https://via.placeholder.com/150" },
  ],
  "Roan handmade": [
    { id: 1, name: "Embroidered Cloth", price: 11, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Decorative Embroidery", price: 16, img: "https://via.placeholder.com/150" },
  ],
  // Crochet
  "Tomi shop": [
    { id: 1, name: "Crochet Hat", price: 8, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Crochet Bag", price: 15, img: "https://via.placeholder.com/150" },
  ],
  "Bubble Mades": [
   { id: 1, price: 10, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyB_SccVu9RFZw3eK4xH7EFRJw5x6FUnsPUg&s" },
    { id: 2, price: 25, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7qOfju082sNrS7KOHg3w0_eAqDm08BgYLg&s" },
    { id: 3, price: 19, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgP2ftv99r_AWhhC5xb7ytJ8E0KtWtj2FOag&s" },
    { id: 4, price: 7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJcUnblBRrNJObJ_lR4DhyAj6hkWGzviK5hw&s" },
    { id: 5, price: 14, img: "https://i.etsystatic.com/56725749/r/il/2a9958/6814514008/il_570xN.6814514008_ohif.jpg" },
    { id: 6, price: 9, img: "https://i.ebayimg.com/images/g/dYgAAOSwLm5kA-lV/s-l1200.jpg" },
  ],
  // Acrylic
  "Bunny nails": [
      { id: 1, price: 7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwLrUdhHrV3tp98DdN9gaH9WRzHhi9eVtJQ&s" },
    { id: 2, price: 16, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KtOqKbRG2qVzR_RqkFx4HHlGjW6Hfm09kw&s" },
    { id: 3, price: 13, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOT_UyEaoPVM6qQGpFSeZ2cl0WIEtNFRhow&s" },
    { id: 4, price: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBM97ucqXYeTKiGWCMZvkOWeNgAwHy4PKRQg&s" },
    { id: 5, price: 24, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPlxX9r8hz36kwO-SZ40x82Xrf3hZ6D_wHFw&s" },
  ],
  // Clay


"Artecharm": [
      { id: 1, price: 5, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpcE4SxDeyGKhFbH4nzD1xxbJ-1LN702nfQ&s" },
    { id: 2, price: 19, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbXDg3MHQ4X-6lquYrO8gBw5xSf5Ml5zwfqg&s" },
    { id: 3, price: 8, img: "https://i.pinimg.com/originals/04/50/40/04504094788ecfa8de9678417459087c.jpg" },
    { id: 4, price: 14, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDug4swKd5RP6nLg7CCCCo_2REr_9UgB-IsA&s" },
    { id: 5, price: 10, img: "https://i.etsystatic.com/45175455/r/il/c444d3/7058881258/il_300x300.7058881258_k69i.jpg" },
    { id: 6, price: 12, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhWdvT7eIIG0YwYDrN9_09ogJnE--r06VnA&s" },
  ],
  // Candles
  "Lelo Candles": [
     { id: 1, price: 13, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfRClEXtxKYTPaSZQWatfEMvY8_rZy42rNQ&s" },
    { id: 2, price: 17, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUe3OsmppnFEay934y06zk0Zak_pu17jmJA&s" },
    { id: 3, price: 22, img: "https://lelo-candles.com/wp-content/uploads/2024/12/IMG_4884-1-scaled.jpg" },
    { id: 4, price: 10, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl4NKZbBj_QFhKw0Y0QFS_1UTnmLzs6rVqSg&s" },
    { id: 5, price: 9, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJiLQWNrsPMfnoWEAU3q1UaNio24JsWmDgiQ&s" },
    { id: 6, price: 25, img: "https://lelo-candles.com/wp-content/uploads/2024/12/IMG_0946-1-scaled.jpg" },
  ],
  // Painting
  "Art By Nsm": [
    { id: 1, price: 14, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUEffIL3hvja5VqSiO2CmwZXjCRQWB8_GEA&s" },
    { id: 2, price: 21, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoTLzvPktO_6pMolsxrY3DCvGN2fUklb1hSw&s" },
    { id: 3, price: 18, img: "https://www.forumartgallery.com/images/artists/selected_view/NSM-MT8-AW.jpg" },
    { id: 4, price: 12, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU_wpsPIYeYb2chDINRcWxUNsWeMQXf5jV8g&s" },
  ],
  // Other
  "Dreamy Dolls": [
    { id: 1, name: "Handmade Doll", price: 18, img: "https://via.placeholder.com/150" },
  ],
  "ArtHome": [
    { id: 1, name: "art home", price: 18, img: "src/assets/image.png" },
  ],
};

const ItemsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storeName = location.state?.storeName || "نجمة";
  const { addToCart } = useCart();
  const items = allItems[storeName] || [];

  return (
    <div className="p-5">
      <button
        onClick={() => navigate(-1)} // ترجع للصفحة السابقة (المتاجر)
        className="mb-4 px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
      >
        back
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{storeName}</h1>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`${storeColors[storeName] || "bg-white"} p-5 rounded-3xl shadow-md hover:shadow-xl transition-shadow flex flex-col items-center text-center`}
          >
            <img
              src={item.img}
              alt={item.name || "Item"}
              className="w-full h-44 object-cover rounded-2xl mb-4"
            />
            <h2 className="text-lg font-semibold text-purple-800 mb-1">{item.name || "Item"}</h2>
            <p className="text-purple-600 mb-3">${item.price}</p>
            <button
              onClick={() => addToCart({ ...item, store: storeName })}
              className="mt-auto px-4 py-2 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition-colors"
            >add to cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ItemsPage;
