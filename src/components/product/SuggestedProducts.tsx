import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../store/api";
import { IProduct } from "../../types";
import ProductCard from "./ProductCard";
import HeadLine from "../shared/HeadLine";
import SkeletonProductCard from "../shared/SkeletonProductCard";

const SuggestedProducts = ({ product }: { product: IProduct }) => {
  const { data: products, isLoading } = useGetProductsQuery(undefined);
  const [suggestedProducts, setSuggestedProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    if (products) {
      const filtered = products.filter(
        (p) => p.category === product.category && p._id !== product._id
      );
      setSuggestedProducts(filtered);
    }
  }, [products, product]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-12">
      <div className="text-center">
        <HeadLine heading="Suggested Products" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading &&
          [...Array(3)].map((_, index) => <SkeletonProductCard key={index} />)}
        {suggestedProducts.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
  return <div>SuggestedProducts</div>;
};

export default SuggestedProducts;
