import { BarChart2, Package, Settings, ShoppingBag, Users } from "lucide-react";
import React, { useState } from "react";

const DashboardSidebar: React.FC = () => {
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
  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow p-6">
      <div className="mb-8">
        <h2 className="font-semibold text-lg">Welcome, {user.name}</h2>
        <p className="text-gray-600 text-sm">{user.role}</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === "overview"
              ? "bg-orange-50 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          <BarChart2 className="h-5 w-5" />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === "orders"
              ? "bg-orange-50 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          <Package className="h-5 w-5" />
          <span>Orders</span>
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === "products"
              ? "bg-orange-50 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Products</span>
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === "customers"
              ? "bg-orange-50 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Customers</span>
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === "settings"
              ? "bg-orange-50 text-orange-500"
              : "hover:bg-gray-50"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
