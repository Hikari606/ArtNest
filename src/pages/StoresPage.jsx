// src/pages/StoresPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const stores = [
  { category: "jewelry", name: "نجمة", description: "Handcrafted jewelry made with love, from unique pendants to personalized keychains. Every piece tells a story.", link: "https://www.instagram.com/nujumi00/?igsh=MWxzeGI5b3lweWRocQ%3D%3D#", color: "bg-indigo-100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1snetHenX0e2pkOeitiNxvSVLaN6Eu0y-g&s" },
  { category: "jewelry", name: "ɪɴᴀɴɴᴀ ғᴀɪʀʏ sᴛᴏʀᴇ", description: "Create sparkling resin jewelry that turns imagination into stunning wearable art.", link: "https://www.instagram.com/inanna.fairy.store?igsh=MXdyYWNqdGNqMGI5OQ%3D%3D", color: "bg-teal-100", img: "https://pbs.twimg.com/media/GlZy5jjawAA9Uyk?format=jpg&name=4096x4096" },
  { category: "jewelry", name: "Pearly", description: "Handmade accessories that add a unique touch of style and creativity to every outfit.", link: "https://www.instagram.com/pearly._____?igsh=MTliNHR1dzdkcm5hZQ%3D%3D", color: "bg-pink-100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_r623BUJJVI4wDKkunyY6bgWddT_FxwGQQ&s" },
  { category: "jewelry-material", name: "trend store", description: "Supplies for jewelry & bag making, beads, chains, and all your crafting essentials.", link: "https://www.instagram.com/trend_.stor/", color: "bg-yellow-100", img: "https://dslv9ilpbe7p1.cloudfront.net/HsHY9u8AgVNfAaAzaz4iJA_store_header_image" },
  { category: "embroidery", name: "Inanna art", description: "Hand-stitched embroidery pieces crafted with care and creativity. Turning simple threads into timeless art.", link: "https://www.instagram.com/inanna__art/?igsh=Mm00M3BvejYxNW44#", color: "bg-blue-100", img: "https://i.ytimg.com/vi/MtdaHgDRAKI/maxresdefault.jpg" },
  { category: "embroidery", name: "Roan handmade", description: "Handmade embroidery that blends tradition with modern art. Every stitch tells a story.", link: "https://www.instagram.com/roan_hand_made/?igsh=YzY1cnN0bWtmZ2J1#", color: "bg-blue-200", img: "https://ih1.redbubble.net/image.3184310127.5941/raf,750x1000,075,t,101010:01c5ca27c6.jpg" },
  { category: "embroidery", name: "Perle Handmade", description: "Beautiful embroidery pieces that capture elegance and craftsmanship.", link: "https://www.instagram.com/perle_handmade/", color: "bg-blue-300", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLNAysajg5gDnRvZ1pYJo4vZpmxQO68JaS1Q&s" },
  { category: "crochet", name: "Tomi shop", description: "Cozy handmade crochet creations made with love and colorful yarn. From cute accessories to warm decor.", link: "https://www.instagram.com/tomiesh0p/", color: "bg-rose-100", img: "https://www.momjunction.com/wp-content/uploads/baby-names/bn-wallpapers/tomi_birthday_wallpaper.jpg" },
  { category: "crochet", name: "Bubble Mades", description: "Adorable handmade crochet dolls, crafted with love and full of personality.", link: "https://www.instagram.com/bubble_made?igsh=MWVxZXY1aGdqZDdzYw%3D%3D", color: "bg-rose-200", img: "https://colorbliss.com/examples/generators/bubble-letter.png" },
  { category: "crochet", name: "Lamsa for crochet", description: "Handmade crochet pieces combining creativity and functionality.", link: "https://www.instagram.com/lamsa_crochet/", color: "bg-rose-300", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dQ8fteJFDv63a2GAVeIZE-KFP9i49kskdA&s" },
  { category: "acrylic", name: "Bunny nails", description: "Stunning acrylic nails crafted with style and precision — nails that speak for you.", link: "https://www.instagram.com/bun_nyystore/?igsh=MzdtNnpsdWdmZGpz#", color: "bg-violet-100", img: "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/BlogThumbnail_Bunny_Nail_Design_1024x1024.webp?v=1726567476" },
  { category: "painting", name: "Sally’s art shop", description: "Original paintings and designs that bring spaces to life.", link: "https://www.etsy.com/shop/sallysartshop", color: "bg-sky-200", img: "https://i.etsystatic.com/36748474/r/il/e5e2a9/6586283399/il_fullxfull.6586283399_oorx.jpg" },
{ category: "acrylic", name: "Jelly Nails", description: "Creative acrylic nail designs for unique personal style.", link: "https://www.instagram.com/jelly_nails/", color: "bg-violet-200", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBJLHm7O3sGl5FKOVKSOvEzoF7yjXa4JEbw&s" },
  { category: "clay", name: "Artecharm", description: "Handmade clay creations from unique pottery to charming miniatures, crafted with love.", link: "https://www.instagram.com/arte_charm/?igsh=eDdqd3d4azVvbncz#", color: "bg-lime-100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpajyPEjaPA0Pl0krlQ6QyXAt_kAZBYoPB9g&s" },
  { category: "painting", name: "Noon Art", description: "Creative Arabic calligraphy and modern paintings.", link: "https://www.instagram.com/noon_art/", color: "bg-sky-300", img: "https://www.shutterstock.com/image-vector/noor-arabic-calligraphy-artwork-vector-260nw-2593184129.jpg" },
  { category: "other", name: "Mary Land", description: "Art inspired by iconic flags and regional designs.", link: "https://www.instagram.com/mary_land/", color: "bg-gray-100", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Maryland.svg/1200px-Flag_of_Maryland.svg.png" },
  { category: "other", name: "NECLA DESIGN", description: "Modern design and creative handmade products.", link: "https://www.instagram.com/necla_design/", color: "bg-gray-200", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRkQIapNWnMWd8tDBVBFpt-t0qAoXI0KU7EA&s" },
  { category: "clay", name: "Tarchya", description: "Beautiful polymer clay creations.", link: "https://www.instagram.com/tarchya/", color: "bg-lime-200", img: "https://www.walnutandcherry.com/cdn/shop/files/Polymer_Ton_Ohrringe_Barolo-2.jpg?v=1726502746&width=1500" },
  { category: "clay", name: "Qaws Qazah", description: "Unique clay art pieces with personal touch.", link: "https://www.instagram.com/qaws_qazah/", color: "bg-lime-300", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhKyvB2xEMcsWOK-Zr2eVtLNTkfGkz0xCvg&s" },
  { category: "resin", name: "Paste Store", description: "Resin art products crafted with precision and creativity.", link: "https://www.instagram.com/paste_store/", color: "bg-purple-100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgnDi7FSyc-6V_xFSqBIed5N__gI5ucCfRA&s" },
  { category: "resin", name: "Bartha Store", description: "Stunning resin creations that bring imagination to life.", link: "https://www.instagram.com/bartha_store/", color: "bg-purple-200", img: "https://insight.ifate.com/numerology-images/name-meanings/bartha-name-meaning.webp" },
  { category: "resin", name: "Amoo Rizin", description: "Handmade resin art, full of colors and life.", link: "https://www.instagram.com/amoo_rizin/", color: "bg-purple-300", img: "https://images.squarespace-cdn.com/content/v1/60f960aac2eb604dcfb280fa/1718445413051-SDA2JHYM8I18MOFCMMH0/ocean-art1.jpg?format=1000w" },
  { category: "candles", name: "Coco store", description: "Unique candles and home scents.", link: "https://www.cocotheshop.com/", color: "bg-amber-200", img: "https://www.cocotheshop.com/cdn/shop/files/logo_svg_7e7ef758-a40c-4136-86e9-eb581a25b1c7_500x500.svg?v=1704742977" },
  { category: "candles", name: "Lelo Candles", description: "Light up your space with beautifully crafted candles that add warmth and style.", link: "https://www.instagram.com/lelo_candless?igsh=MWM1Nm55NmVobGxrdg%3D%3D", color: "bg-amber-100", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLg6ctE6gYu6e-Bnp3Iae-0h9yI6_WyVjWfg&s" },
  { category: "candles", name: "شموع گاردينيا", description: "Beautiful handmade candles.", link: "https://www.instagram.com/gardinia_candles/", color: "bg-amber-300", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhybdcNXKWBqBzHC1qJlln7cnPtZnrr_95xnlbLDRA-AaGwlc6WLalHI9IeF-Qf87G1FEkuUa3UN_97egngdRKf16IyTn3nzoXKMDF9dYCf4KmW4pp8e1fDp_HZbBMACzwsT7CKnSFWZTnw/s1600/birthdaycandles1.jpg" },
  { category: "candles", name: "cocanat candles", description: "Handcrafted coconut-based candles.", link: "https://www.instagram.com/cocanat_candles/", color: "bg-amber-400", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfwIN53vJU1rXIxYapkvkUYFUGuLZDP7a04A&s" },
  { category: "other", name: "master shop", description: "Variety of handmade and craft items.", link: "https://www.instagram.com/master_shop/", color: "bg-gray-300", img: "https://cdn.salla.sa/form-builder/Mg51AKv5E68OYeBOn9P8218MosFiRE8i5UYBWHAZ.png" },
  { category: "other", name: "صنعة", description: "Handmade craft items with passion.", link: "https://www.instagram.com/san3a_store/", color: "bg-gray-400", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmQ6gGV4AP67ogZzQh4JzMS4o2kJw2wskyEw&s" },
  { category: "painting", name: "Art By Nsm", description: "Original paintings & artwork bringing color and creativity to life.", link: "https://www.instagram.com/artbynsm?igsh=bDdqYnliZ2oybTYw", color: "bg-sky-100", img: "https://thumbs.dreamstime.com/b/creative-rounded-initial-letters-nsm-logo-will-be-suitable-which-company-brand-name-start-229322806.jpg" },
  { category: "other", name: "safa store", description: "Handmade and artistic creations.", link: "https://www.instagram.com/safa_official/", color: "bg-gray-500", img: "https://safaofficial.store/cdn/shop/files/502563013_122126509262816158_8968507484890687811_n.jpg?v=1753975919&width=500" },
  { category: "other", name: "Dreamy Dolls", description: "Bring imagination to life with handmade dolls full of charm and personality.", link: "https://www.instagram.com/dreamy.dolls9?igsh=MXZyYXZncTF4OWxtaQ%3D%3D", color: "bg-gray-100", img: "https://www.rontar.com/blog/wp-content/uploads/2024/08/doll-company-name-ideas.jpg" },
  {
    category: "ArtHome",
    name: "ArtHome",
    description: "Art Home is a collaborative space where creativity comes to life. It offers us a welcoming place to hold sessions, workshops, or in-person courses, fostering learning and artistic exchange.",
    link: "https://www.instagram.com/art.home.iq?igsh=MW82b29rdGZ5YWlxNw==",
    color: "bg-gray-100",
    img: "https://github.com/Hikari606/ArtNest/blob/main/src/assets/image.png?raw=true"
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "jewelry", label: "Jewelry" },
  { key: "embroidery", label: "Embroidery" },
  { key: "crochet", label: "Crochet" },
  { key: "handpainted", label: "Hand-painted" },
  { key: "acrylic", label: "Acrylic Art" },
  { key: "clay", label: "Clay Art" },
  { key: "resin", label: "Resin Art" },
  { key: "candles", label: "Candle Art" },
  { key: "painting", label: "Painting" },
  { key: "other", label: "Other" },
  { key: "ArtHome", label: "ArtHome" },
  { key: "jewelry-material", label: "Jewelry Materials" },
  { key: "crochet-material", label: "Crochet Materials" },
  { key: "resin-material", label: "Resin Materials" },
  { key: "candles-material", label: "Candle Materials" },
];
const StoresPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "all";

  const [filter, setFilter] = useState(initialCategory);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cur = new URLSearchParams(location.search);
    if (filter === "all") cur.delete("category");
    else cur.set("category", filter);
    navigate({ search: cur.toString() }, { replace: true });
  }, [filter, location.search, navigate]);

  const filteredStores = (filter === "all" ? stores : stores.filter((store) => store.category === filter))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">ART NEST</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 rounded text-black outline-none w-full sm:w-auto bg-white shadow-sm hover:shadow-md transition">
            {categories.map((cat) => (
              <option key={cat.key} value={cat.key}>{cat.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded text-black outline-none w-full sm:w-64 bg-white shadow-sm hover:shadow-md transition"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        {filteredStores.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">لا توجد متاجر لهذا التصنيف.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store, index) => (
              store.category === "ArtHome" ? (
                // رابط خارجي لArtHome
                <a
                  key={index}
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${store.color} p-5 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-lg transition transform hover:-translate-y-1`}
                >
                  {store.img && <img src={store.img} alt={store.name} className="w-full h-44 object-cover rounded-lg mb-3 shadow-sm" />}
                  <h2 className="text-xl font-bold text-gray-700">{store.name}</h2>
                  <p className="text-gray-600 mt-2 mb-4 leading-relaxed">{store.description}</p>
                  <span className="mt-3 text-sm text-gray-600">{store.category}</span>
                </a>
              ) : (
                <Link
                  key={index}
                  to="/items"
                  state={{ storeName: store.name }}
                  className={`${store.color} p-5 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-lg transition transform hover:-translate-y-1`}
                >
                  {store.img && <img src={store.img} alt={store.name} className="w-full h-44 object-cover rounded-lg mb-3 shadow-sm" />}
                  <h2 className="text-xl font-bold text-gray-700">{store.name}</h2>
                  <p className="text-gray-600 mt-2 mb-4 leading-relaxed">{store.description}</p>
                  <span className="mt-3 text-sm text-gray-600">{store.category}</span>
                </Link>
              )
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StoresPage;
