import React from "react";

const CustomToast = ({ message, name, Icon }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            {Icon && <Icon className="text-orange-500" />}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
