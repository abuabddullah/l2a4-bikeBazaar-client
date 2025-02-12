import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/slices/authSlice";
import { loginSchema } from "../../zodSchemas/auth.schemas";
import CheckboxInput from "../reusableInputTags/CheckboxInput";
import PasswordInput from "../reusableInputTags/PasswordInput";
import TextInput from "../reusableInputTags/TextInput";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // for  checkbox default value is false and unchecked
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      dispatch(login(result));
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input */}
      <TextInput
        name="email"
        control={control}
        label="Email address"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      {/* Password Input */}
      <PasswordInput
        name="password"
        control={control}
        label="Password"
        error={errors.password?.message}
      />

      {/* Remember Me Checkbox and Forgot Password Link */}
      <div className="flex items-center justify-between">
        {/* Reusable Checkbox Input */}
        <CheckboxInput
          name="rememberMe"
          control={control}
          label="Remember me"
        />

        {/* Forgot Password Link */}
        <div className="text-sm">
          <a href="#" className="text-orange-500 hover:text-orange-600">
            Forgot your password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
