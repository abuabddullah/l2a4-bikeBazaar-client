import { BsCart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { StarIcon } from "lucide-react";

interface ProductCardProps {
  product: IProduct;
  isOffered?: boolean;
}

export default function ProductCard({ product, isOffered }: ProductCardProps) {
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              {product.brand} - {product.productModel}
            </p>
          </div>
          <div className="text-orange-500 flex items-center  mt-2">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`h-4 w-4 ${
                  index < Math.floor(product?.averageRating || 0)
                    ? "text-orange-500 fill-orange-300"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col items-center justify-between">
            {isOffered && (
              <span className="text-xl font-bold text-orange-500 line-through">
                ${product.price * 1.5}
              </span>
            )}
            <span className="text-xl font-bold text-orange-500">
              ${product.price}
            </span>
          </div>
          <button
            onClick={
              user?.role === "customer"
                ? handleAddToCart
                : () => navigate("/login")
            }
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition"
          >
            <BsCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
