import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonProductCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Skeleton for Image */}
      <Skeleton height={192} width="100%" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Skeleton for Product Name */}
            <Skeleton width={150} height={20} />
            {/* Skeleton for Product Info (Brand & Model) */}
            <Skeleton width={100} height={15} />
          </div>
          <div className="text-orange-500 flex items-center mt-2">
            {/* Skeleton for Ratings */}
            <Skeleton width={80} height={16} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-center justify-between">
            {/* Skeleton for Price */}
            <Skeleton width={80} height={24} />
            <Skeleton width={80} height={24} />
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={60} />
          </button>
        </div>
      </div>
    </div>
  );
}
