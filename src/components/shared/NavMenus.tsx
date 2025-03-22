import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, selectCurrentUser } from "../../store/slices/authSlice";
import { ActiveLink } from "./ActiveLink";

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
      <MegaMenu />
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
        {isMegaMenuOpen && (
          <div className="absolute top-10 left-0 w-[300px] bg-white shadow-xl rounded-lg p-6 z-50 border border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              {/* Mega Menu - Product Categories */}
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-4">
                  Categories
                </h3>
                <ul>
                  {["city", "mountain", "road"].map((category) => (
                    <li key={category}>
                      <Link
                        to={`/products?category=${category}`}
                        className="text-gray-800 hover:text-orange-500 transition-colors font-medium"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Link>
                      <ul className="pl-4 mt-2 space-y-2">
                        {[
                          "urban",
                          "commuter",
                          "trail",
                          "downhill",
                          "sport",
                          "touring",
                        ]
                          .filter((sub) => sub.includes(category))
                          .map((subCategory) => (
                            <li key={subCategory}>
                              <Link
                                to={`/products?category=${category}&subCategory=${subCategory}`}
                                className="text-gray-600 hover:text-orange-400 transition-colors"
                              >
                                {subCategory.charAt(0).toUpperCase() +
                                  subCategory.slice(1)}{" "}
                                Bikes
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mega Menu - User Account Section */}
              <div>
                <h3 className="font-semibold text-xl text-gray-800 mb-4">
                  Account
                </h3>
                <ul>
                  {user ? (
                    <>
                      {user.role === "admin" && (
                        <li>
                          <Link
                            to="/dashboard/admin"
                            className="text-gray-800 hover:text-orange-500 transition-colors"
                          >
                            Admin Dashboard
                          </Link>
                          <ul className="pl-4 mt-2 space-y-2">
                            <li>
                              <Link
                                to="/dashboard/admin/products"
                                className="text-gray-600 hover:text-orange-400 transition-colors"
                              >
                                Manage Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/admin/orders"
                                className="text-gray-600 hover:text-orange-400 transition-colors"
                              >
                                Manage Orders
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {user.role === "customer" && (
                        <li>
                          <Link
                            to="/dashboard/customer"
                            className="text-gray-800 hover:text-orange-500 transition-colors"
                          >
                            Customer Dashboard
                          </Link>
                          <ul className="pl-4 mt-2 space-y-2">
                            <li>
                              <Link
                                to="/dashboard/customer/orders"
                                className="text-gray-600 hover:text-orange-400 transition-colors"
                              >
                                My Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/customer/wishlist"
                                className="text-gray-600 hover:text-orange-400 transition-colors"
                              >
                                My Wishlist
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => dispatch(logout())}
                          className="text-gray-800 hover:text-orange-500 transition-colors"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="text-gray-800 hover:text-orange-500 transition-colors"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="text-gray-800 hover:text-orange-500 transition-colors"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export const MegaMenu2 = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      {/* Mega Menu - Toggle visibility based on isMegaMenuOpen */}
      <div className="hidden lg:block relative">
        <button
          onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          className="text-white text-3xl"
        >
          <CgMenuGridO />
        </button>
        {isMegaMenuOpen && (
          <div className="absolute top-10 left-0 w-96 bg-white shadow-lg p-4 z-50">
            <div className="grid grid-cols-2 gap-4">
              {/* Mega Menu - Products Categories */}
              <div>
                <h3 className="font-bold text-lg">Categories</h3>
                <ul>
                  <li>
                    <Link
                      to="/products?category=city"
                      className="text-gray-800 hover:text-orange-500"
                    >
                      City
                    </Link>
                    <ul className="pl-4 mt-2">
                      <li>
                        <Link
                          to="/products?category=city&subCategory=urban"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Urban Bikes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products?category=city&subCategory=commuter"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Commuter Bikes
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to="/products?category=mountain"
                      className="text-gray-800 hover:text-orange-500"
                    >
                      Mountain
                    </Link>
                    <ul className="pl-4 mt-2">
                      <li>
                        <Link
                          to="/products?category=mountain&subCategory=trail"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Trail Bikes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products?category=mountain&subCategory=downhill"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Downhill Bikes
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      to="/products?category=road"
                      className="text-gray-800 hover:text-orange-500"
                    >
                      Road
                    </Link>
                    <ul className="pl-4 mt-2">
                      <li>
                        <Link
                          to="/products?category=road&subCategory=sport"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Sport Bikes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products?category=road&subCategory=touring"
                          className="text-gray-600 hover:text-orange-400"
                        >
                          Touring Bikes
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              {/* Mega Menu - User-specific Links */}
              <div>
                <h3 className="font-bold text-lg">Account</h3>
                <ul>
                  {user ? (
                    <>
                      {user.role === "admin" && (
                        <li>
                          <Link
                            to="/dashboard/admin"
                            className="text-gray-800 hover:text-orange-500"
                          >
                            Admin Dashboard
                          </Link>
                          <ul className="pl-4 mt-2">
                            <li>
                              <Link
                                to="/dashboard/admin/products"
                                className="text-gray-600 hover:text-orange-400"
                              >
                                Manage Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/admin/orders"
                                className="text-gray-600 hover:text-orange-400"
                              >
                                Manage Orders
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {user.role === "customer" && (
                        <li>
                          <Link
                            to="/dashboard/customer"
                            className="text-gray-800 hover:text-orange-500"
                          >
                            Customer Dashboard
                          </Link>
                          <ul className="pl-4 mt-2">
                            <li>
                              <Link
                                to="/dashboard/customer/orders"
                                className="text-gray-600 hover:text-orange-400"
                              >
                                My Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dashboard/customer/wishlist"
                                className="text-gray-600 hover:text-orange-400"
                              >
                                My Wishlist
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => dispatch(logout())}
                          className="text-gray-800 hover:text-orange-500"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="text-gray-800 hover:text-orange-500"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="text-gray-800 hover:text-orange-500"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
