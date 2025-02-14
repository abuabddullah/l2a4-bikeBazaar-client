import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiTruck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextareaInput from "../components/reusableInputTags/TextareaInput";
import TextInput from "../components/reusableInputTags/TextInput";
import { useCreateOrderMutation } from "../store/api";
import { useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { RootState } from "../store/store";

export interface ICheckoutFormData {
  items: IOrderItemType[];
  shippingAddress: IShippingAddress;
}

export interface IOrderItemType {
  productId: string;
  quantity: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  let items = cartItems?.map((item) => ({
    productId: item.product._id,
    quantity: item.quantity,
  }));
  const { control, handleSubmit } = useForm<ICheckoutFormData>();
  const [submitCheckout, { isLoading }] = useCreateOrderMutation();

  const onSubmit: SubmitHandler<ICheckoutFormData> = async (
    shippingAddress
  ) => {
    const orderData = {
      items,
      shippingAddress,
    };
    try {
      await submitCheckout(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Order placed successfully!", { id: "ordering success" });
      navigate("/dashboard/customer/my-orders");
    } catch (error) {
      alert("Failed to place order. Try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">
          Add some products to your cart to proceed with checkout.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Processing your order...</h2>
        <p className="text-gray-600">
          Please wait while we process your checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex items-center gap-4">
                  <img
                    src={item.product.imageURL}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.product.price * item.quantity)?.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FiTruck className="h-5 w-5 text-gray-400" />
                  <span>Shipping</span>
                </div>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping?.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  {/* Address Input */}
                  <TextareaInput
                    name="address"
                    control={control}
                    label="Delivery Address"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  {/* city Input */}
                  <TextInput
                    name="city"
                    control={control}
                    label="City"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  {/* postalCode Input */}
                  <TextInput
                    name="postalCode"
                    control={control}
                    label="Postal Code"
                    placeholder="Enter your postal Code"
                  />
                </div>
                <div className="col-span-2">
                  {/* country Input */}
                  <TextInput
                    name="country"
                    control={control}
                    label="Country"
                    placeholder="Enter your country"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
