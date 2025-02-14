import { useEffect, useState } from "react";
import { LuFilter, LuSearch } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import {
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../store/api";
// import products from "../data/products.json";

export default function Products() {
  const { data: products } = useGetProductsQuery();
  const [searchParams] = useSearchParams();
  const categoryQueryParam = searchParams.get("category");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSelectedCategories(categoryQueryParam ? [categoryQueryParam] : []);
  }, [categoryQueryParam]);

  let { data: categories } = useGetCategoriesQuery();
  if (!categories?.length) {
    categories = ["mountain", "city", "road"];
  }
  const { data: brands } = useGetBrandsQuery();

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-4">
              <LuFilter className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>

            {/* Search Input */}
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border rounded pl-10"
              />
              <LuSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                  className="w-24 px-2 py-1 border rounded"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                  className="w-24 px-2 py-1 border rounded"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              {categories?.map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category)
                        );
                      }
                    }}
                    className="rounded"
                  />
                  {category}
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brands</h3>
              {brands?.map((brand) => (
                <label key={brand} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter((b) => b !== brand)
                        );
                      }
                    }}
                    className="rounded"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-600">
              {filteredProducts?.length} products found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
