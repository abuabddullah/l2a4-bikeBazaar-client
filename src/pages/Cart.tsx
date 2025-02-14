import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";
import { RootState } from "../store/store";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Add some products to your cart to continue shopping.
        </p>
        <Link
          to="/products"
          className="inline-block bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center p-6 border-b last:border-b-0"
              >
                <img
                  src={item.product.imageURL}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.brand}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">
                        ${item.product.price * item.quantity}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalAmount?.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors">
                <Link to="/checkout">Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
