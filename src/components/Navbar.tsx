import { LuLayoutDashboard } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
import { RiMenu3Fill } from "react-icons/ri";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { MobileMenus, TabMenues } from "./NavMenus";

export default function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md relative overflow-hidden000">
      <div className="max-w-7xl mx-auto md:px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">
              BikeBazaar
            </span>
          </Link>
          {isSmallScreen && <MobileMenus />}
          <TabMenues />

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <CgShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/dashboard">
              <LuLayoutDashboard className="h-6 w-6 text-gray-700" />
            </Link>
            <button className="md:hidden">
              <RiMenu3Fill
                onClick={() => setIsSmallScreen(!isSmallScreen)}
                className="h-6 w-6 text-gray-700"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
