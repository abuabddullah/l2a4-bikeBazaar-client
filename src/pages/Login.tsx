import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-600"
            >
              create a new account
            </Link>
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
