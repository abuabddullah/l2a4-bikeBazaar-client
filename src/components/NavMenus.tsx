import { Link, NavLink } from "react-router-dom";
import { ActiveLink } from "./ActiveLink";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/login", label: "Login" },
];

export const MobileMenus = () => {
  return (
    <div className="mobile md:hidden flex flex-col bg-white absolute top-full w-full z-20 space-y-3 p-3 md:flex-row md:items-center md:space-x-8 shadow-lg">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-gray-700 hover:text-orange-500"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export const TabMenues = () => {
  return (
    <div className="pad hidden md:flex items-center space-x-8">
      {menuItems.map((item) => (
        <ActiveLink
          key={item.path}
          to={item.path}
          className="text-white hover:underline"
          activeClassName="font-bold underline"
        >
          {item.label}
        </ActiveLink>
      ))}
    </div>
  );
};
