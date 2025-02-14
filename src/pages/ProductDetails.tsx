import { BsCart } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { LuRotateCcw, LuShield } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductsQuery } from "../store/api";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductDetails() {
  const { data: products } = useGetProductsQuery();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products?.find((p) => p._id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const features = [
    {
      icon: FiTruck,
      title: "Free Shipping",
      description: "On orders over $500",
    },
    {
      icon: LuShield,
      title: "2 Year Warranty",
      description: "Full coverage",
    },
    {
      icon: LuRotateCcw,
      title: "30 Day Return",
      description: "Money back guarantee",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow">
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-orange-500">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                Brand: {product.brand}
              </span>
              <span className="text-sm text-gray-500">
                Model: {product.productModel}
              </span>
            </div>

            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="mb-8">
              <h2 className="font-semibold mb-2">Stock Status:</h2>
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                <span>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <button
              onClick={
                user?.role === "customer"
                  ? handleAddToCart
                  : () => navigate("/login")
              }
              disabled={product.stock === 0}
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-8 flex items-center justify-center gap-2"
            >
              <BsCart className="h-5 w-5" />
              Add to Cart
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Technical Details</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Brand</td>
                  <td className="py-2 font-medium">{product.brand}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Model</td>
                  <td className="py-2 font-medium">{product.productModel}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Category</td>
                  <td className="py-2 font-medium">{product.category}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Additional Information</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Lightweight frame design</li>
              <li>High-performance components</li>
              <li>Durable construction</li>
              <li>Easy maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
