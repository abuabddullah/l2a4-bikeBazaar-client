import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import { ActiveLink } from "./ActiveLink";
import MegaMenuKid from "./MegaMenu";

const menuItems = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
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
      <MegaMenu />
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

export const MegaMenu = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      {/* Mega Menu - Toggle visibility based on isMegaMenuOpen */}
      <div className="hidden lg:block relative mt-2">
        <button
          onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          className="text-white text-3xl  transition-colors"
        >
          <CgMenuGridO />
        </button>
        {isMegaMenuOpen && <MegaMenuKid />}
      </div>
    </>
  );
};
