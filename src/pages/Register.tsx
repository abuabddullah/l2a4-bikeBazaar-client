import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";
import { CgLogOut } from "react-icons/cg";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="p-4">
        <button className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900">
          <CgLogOut className="mr-3 h-5 w-5" />
          <Link to="/">Back</Link>
        </button>
      </div>
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600">
            Or{" "}
            <Link to="/login" className="text-orange-500 hover:text-orange-600">
              sign in to your account
            </Link>
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
