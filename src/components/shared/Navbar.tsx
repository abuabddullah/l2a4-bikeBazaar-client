import { CgShoppingCart } from "react-icons/cg";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";

import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import { RootState } from "../../store/store";
import logo from "./../../assets/images/logo.png";
import { MobileMenus, TabMenues } from "./NavMenus";

export default function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  return (
    <nav className="bg-orange-500 shadow-md relative000 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto md:px-4">
        <div className="flex place-content-around lg:justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="BikeBazaar" className="h-8 w-8" />
            <span className="hidden lg:block text-2xl ps-2 font-bold text-white">
              BikeBazaar
            </span>
          </Link>
          {isSmallScreen && <MobileMenus />}
          <TabMenues />
          <div className="flex items-center space-x-4">
            {(!user || user.role === "customer") && (
              <Link to="/cart" className="relative hidden lg:block">
                <CgShoppingCart className="h-6 w-6 text-white" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <>
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
              <>
                <Link title="Login" to="/login">
                  <span className="h-6 w-6 text-white">Login</span>
                </Link>
                <Link title="Register" to="/register">
                  <span className="h-6 w-6 text-white hidden lg:block">
                    Register
                  </span>
                </Link>
              </>
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
