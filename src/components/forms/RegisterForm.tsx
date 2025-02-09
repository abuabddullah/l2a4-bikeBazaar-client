import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerSchema } from "../../zodSchemas/auth.schemas";
import EmailInput from "../reusableInputTags/EmailInput";
import PasswordInput from "../reusableInputTags/PasswordInput";
import TextInput from "../reusableInputTags/TextInput";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const result = await response.json();
      console.log({ result });
      toast.success("Registration successful", { id: "registration" });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name Input */}
      <TextInput
        name="name"
        control={control}
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.name?.message}
      />

      {/* Email Input */}
      <EmailInput
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

      {/* Confirm Password Input */}
      <PasswordInput
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
