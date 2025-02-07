import { createBrowserRouter } from "react-router-dom";
import UpdateProductForm from "../components/forms/UpdateProductForm";
import { DashboardLayout } from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Dashboard from "../pages/dashboards/Dashboard";
import DashBoardProducts from "../pages/dashboards/DashBoardProducts";
import MyOrders from "../pages/dashboards/MyOrders";
import Orders from "../pages/dashboards/Orders";
import Settings from "../pages/dashboards/Settings";
import Users from "../pages/dashboards/Users";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/products",
        element: <DashBoardProducts />,
      },
      {
        path: "/dashboard/update-products/:id",
        element: <UpdateProductForm />,
      },
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
