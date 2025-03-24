import Skeleton from "react-loading-skeleton"; // Importing Skeleton
import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <Skeleton height={192} width="100%" />
      </div>
      <div className="p-4">
        <Skeleton width="80%" height={20} />
        <Skeleton width="60%" height={24} className="mt-3" />
      </div>
    </motion.div>
  );
};

export default ProductSkeleton;
