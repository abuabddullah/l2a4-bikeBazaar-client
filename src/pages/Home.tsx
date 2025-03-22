import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../store/api";
import OurPartners from "../components/homepage/OurPartners";
import StaticBanner from "../components/homepage/StaticBanner";
import FAQ from "../components/homepage/FAQ";
import BannerCarousel from "../components/homepage/BannerCarousel";
import NewsLetter from "../components/homepage/NewsLetter";
import Carousel3d from "../components/homepage/Carousel3d";
import OfferedProducts from "../components/homepage/OfferedProducts";
import CompareProduct from "../components/homepage/CompareProduct";
import HeadLine from "../components/shared/HeadLine";

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
  const { data: products } = useGetProductsQuery();
  let { data: categories } = useGetCategoriesQuery();
  let { data: brands } = useGetBrandsQuery();
  if (categories?.length !== 3) {
    categories = ["mountain", "city", "road"];
  }
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
      {/* static banner */}
      <StaticBanner />

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <HeadLine heading="Featured Products" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <BannerCarousel />

      {/* Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <HeadLine heading="Shop By Category" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <div
                onClick={() => navigate(`/products?category=${category}`)}
                key={category}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    category === "mountain"
                      ? "1574117482334-14b040604998"
                      : category === "road"
                      ? "1621344581466-20e6fe271d61"
                      : "1602878558403-25ae1c9f171c"
                  }?w=800`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Bikes
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CompareProduct />
      <NewsLetter />
      {/* bands */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <HeadLine heading="Shop By Brand" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {brands?.map((brand) => (
              <div
                onClick={() => navigate(`/products?brand=${brand}`)}
                key={brand}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://res.cloudinary.com/dglsw3gml/image/upload/v1742613048/bicycle-shop/bike_brnd_dlw7vs.jpg`}
                  alt={brand}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {brand.charAt(0).toUpperCase() + brand.slice(1)} Bikes
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <OfferedProducts />
      <OurPartners />
      <FAQ />
    </div>
  );
}
