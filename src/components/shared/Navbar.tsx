import { CgShoppingCart } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";

import { useState } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import { RootState } from "../../store/store";
import { MobileMenus, TabMenues } from "./NavMenus";

export default function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  console.log({ user });

  return (
    <nav className="bg-orange-500 shadow-md relative overflow-hidden000">
      <div className="max-w-7xl mx-auto md:px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">BikeBazaar</span>
          </Link>
          {isSmallScreen && <MobileMenus />}
          <TabMenues />

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === "customer" && (
                  <Link to="/cart" className="relative">
                    <CgShoppingCart className="h-6 w-6 text-white" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/dashboard/admin">
                    <LuLayoutDashboard className="h-6 w-6 text-white" />
                  </Link>
                )}
                {user.role === "customer" && (
                  <Link to="/dashboard/customer">
                    <LuLayoutDashboard className="h-6 w-6 text-white" />
                  </Link>
                )}
                <button title="Logout" onClick={() => dispatch(logout())}>
                  <AiOutlineLogout className="h-6 w-6 text-white" />
                </button>
              </>
            ) : (
              <Link title="Login" to="/login">
                <AiOutlineLogin className="h-6 w-6 text-white" />
              </Link>
            )}
            <button className="md:hidden">
              <RiMenu3Fill
                onClick={() => setIsSmallScreen(!isSmallScreen)}
                className="h-6 w-6 text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
