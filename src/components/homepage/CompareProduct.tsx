import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../store/api";
import { getLeastStockProducts } from "../../utils/getLeastStockProducts";
import { motion } from "framer-motion"; // Note: You'll need to install framer-motion
import HeadLine from "../shared/HeadLine";

const CompareProduct = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [offeredProducts, setOfferedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      const leastStockProducts = getLeastStockProducts(products, 4);
      setOfferedProducts(leastStockProducts);
    }
  }, [products]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleCompare = (product: any) => {
    if (selectedProducts.length < 2) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleReset = () => {
    setSelectedProducts([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <HeadLine heading="Compare Products" />
        </div>
        {selectedProducts.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all shadow-lg"
          >
            Reset Comparison
          </motion.button>
        )}
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
        {selectedProducts.map((product) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform"
          >
            <div className="relative">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-orange-500 text-lg font-semibold">
                ${product.price}
              </p>
              <p className="mt-3 text-gray-600 line-clamp-3">
                {product.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {offeredProducts?.map((product: any) => (
          <motion.div
            whileHover={{ y: -5 }}
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-3">{product.name}</h4>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCompare(product)}
                disabled={selectedProducts.length >= 2}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 transition-all"
              >
                Compare
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompareProduct;
