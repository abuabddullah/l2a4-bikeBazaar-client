import toast from "react-hot-toast";
import {
  useCreatePaymentMutation,
  useGetMyOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../store/api";

const MyOrders = () => {
  const { data: myOrders, isLoading } = useGetMyOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [createPayment] = useCreatePaymentMutation();

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateOrderStatus({ id, status }).unwrap();
      toast.success("Order status updated successfully", {
        id: "order-status",
      });
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handlePayment = async (orderId: string) => {
    try {
      const response = await createPayment(orderId).unwrap();
      if (response?.GatewayPageURL) {
        window.location.href = response.GatewayPageURL;
      } else {
        toast.error("Payment initiation failed");
      }
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myOrders?.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.totalPrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  {order?.status !== "cancelled" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, "cancelled")
                        }
                        className="text-orange-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      >
                        Cancel
                      </button>
                      {order?.status === "pending" && (
                        <button
                          onClick={() => handlePayment(order._id)}
                          className="text-green-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
