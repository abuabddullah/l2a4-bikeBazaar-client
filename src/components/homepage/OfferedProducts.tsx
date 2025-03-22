import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from "moment";
import { useGetProductsQuery } from "../../store/api";
import ProductCard from "../ProductCard";
import { IProduct } from "../../types";
import { getLeastStockProducts } from "../../utils/getLeastStockProducts";
import HeadLine from "../shared/HeadLine";

const OfferedProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [offeredProducts, setOfferedProducts] = useState<any[]>([]);
  const [key, setKey] = useState(0); // Add this to force timer reset

  // Calculate seconds until next midnight
  const getSecondsUntilMidnight = () => {
    const now = moment();
    const midnight = moment().endOf("day");
    return midnight.diff(now, "seconds");
  };

  // Function to update the offered products every 24 hours
  const updateOfferedProducts = () => {
    if (products) {
      const leastStockProducts = getLeastStockProducts(products, 3);
      setOfferedProducts(leastStockProducts);
    }
  };

  useEffect(() => {
    updateOfferedProducts(); // Initial load

    const interval = setInterval(() => {
      updateOfferedProducts();
      setKey((prev) => prev + 1); // Force timer reset at midnight
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [products]);

  if (isLoading) {
    return (
      <div className="text-center text-xl text-orange-600">Loading...</div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      <div className="text-center">
        <HeadLine heading="Offered Products" />
      </div>

      <div className="flex justify-center gap-4 my-8">
        {["hours", "minutes", "seconds"].map((unit, index) => (
          <div key={unit} className="flex flex-col items-center">
            <CountdownCircleTimer
              key={`${key}-${unit}`}
              isPlaying
              duration={getSecondsUntilMidnight()}
              colors="#FF6600"
              size={60} // Added size prop to make circle smaller
              onComplete={() => {
                console.log("24-hour countdown completed");
                setKey((prev) => prev + 1);
                return { shouldRepeat: true, delay: 1 };
              }}
            >
              {({ remainingTime }) => {
                const hours = Math.floor(remainingTime / 3600);
                const minutes = Math.floor((remainingTime % 3600) / 60);
                const seconds = remainingTime % 60;
                const value =
                  unit === "hours"
                    ? hours
                    : unit === "minutes"
                    ? minutes
                    : seconds;

                return (
                  <div className="text-sm font-semibold text-orange-600">
                    {" "}
                    {/* Reduced text size */}
                    {remainingTime > 0 ? (
                      <span>{String(value).padStart(2, "0")}</span>
                    ) : (
                      <span>00</span>
                    )}
                  </div>
                );
              }}
            </CountdownCircleTimer>
            <span className="mt-1 text-xs text-gray-600 capitalize">
              {" "}
              {/* Adjusted spacing and text size */}
              {unit}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offeredProducts.map((product) => (
          <ProductCard isOffered={true} product={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
};

export default OfferedProducts;
