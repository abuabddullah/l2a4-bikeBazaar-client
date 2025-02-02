import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1600",
    title: "Premium Bikes",
    subtitle: "Up to 40% off on selected models",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=1600",
    title: "New Arrivals",
    subtitle: "Discover our latest collection",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[500px]">
        <img
          src={banners[currentBanner].image}
          alt={banners[currentBanner].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              {banners[currentBanner].title}
            </h1>
            <p className="text-xl">{banners[currentBanner].subtitle}</p>
          </div>
        </div>
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <FaChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
        >
          <FaChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Mountain", "Road", "City"].map((category) => (
              <div
                onClick={() => navigate(`/products?category=${category}`)}
                key={category}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    category === "Mountain"
                      ? "1576435728678-68d0fbf94e91"
                      : category === "Road"
                      ? "1532298229144-0ec0c57515c7"
                      : "1485965120184-e220f721d03e"
                  }?w=800`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category} Bikes
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
