import React from "react";
import { Link, useLocation } from "react-router-dom";

interface ActiveLinkProps {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
}


export const ActiveLink: React.FC<ActiveLinkProps> = ({
  to,
  children,
  activeClassName = "font-bold underline", // এখানের মুলত active link এর styling হবি
  className = "", 
}) => {
  const location = useLocation();

  // Check if the current route matches the link's path
  const isActive = location.pathname === to;

  // merge base className with activeClassName if the link is active
  const combinedClassName = `${className} ${isActive ? activeClassName : ""}`;

  return (
    <Link
      to={to}
      className={combinedClassName}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};
