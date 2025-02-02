import { DollarSign, Package, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";

export default function Dashboard2() {
  const [activeTab, setActiveTab] = useState("overview");
  // const user = useSelector((state: RootState) => state.auth.user);
  const user = { name: "John Doe", role: "Admin" };

  /*  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Please login to access the dashboard
        </h2>
      </div>
    );
  } */

  const stats = [
    { icon: Package, label: "Total Orders", value: "150" },
    { icon: ShoppingBag, label: "Products", value: "45" },
    { icon: Users, label: "Customers", value: "1,234" },
    { icon: DollarSign, label: "Revenue", value: "$12,345" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">{stat.label}</p>
                    <h3 className="text-2xl font-semibold mt-1">
                      {stat.value}
                    </h3>
                  </div>
                  <stat.icon className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((order) => (
                    <tr key={order}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #ORD-{String(order).padStart(4, "0")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Customer {order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Mountain Bike
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $999.99
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
