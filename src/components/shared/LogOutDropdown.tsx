import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { IUser } from "../../types/res.types";
import { User2Icon } from "lucide-react";
import { Link } from "react-router-dom";

type User = Partial<IUser>;

interface LogOutDropdownProps {
  user: User;
}

const LogOutDropdown: React.FC<LogOutDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={
            user.avatar ||
            "https://res.cloudinary.com/dglsw3gml/image/upload/v1742799359/bicycle-shop/avatar_jrnud5.jpg"
          }
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-orange-100 hover:scale-105 transition-transform"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200"
        >
          <div className="p-4 text-center border-b">
            <h3 className="text-sm font-semibold text-gray-800">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <Link
            to={`/dashboard/${user?.role}/profile`}
            className="w-full flex items-center gap-2 px-4 py-3 text-orange-500 hover:bg-gray-100 transition"
          >
            <User2Icon className="w-5 h-5" />
            Profile
          </Link>
          <hr />
          <button
            onClick={() => dispatch(logout())}
            className="w-full flex items-center gap-2 px-4 py-3 text-red-700 hover:bg-gray-100 transition"
          >
            <AiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default LogOutDropdown;
