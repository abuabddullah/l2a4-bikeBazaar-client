import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentCancelled: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <FaTimesCircle className="mx-auto text-red-500 text-6xl" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment has been cancelled. No charges have been made to your
          account.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Return to Home
          </Link>
          <Link
            to="/products"
            className="block w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          If you have any questions, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
