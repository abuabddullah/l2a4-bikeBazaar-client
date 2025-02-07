import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextInput from "../reusableInputTags/TextInput";
import EmailInput from "../reusableInputTags/EmailInput";
import PasswordInput from "../reusableInputTags/PasswordInput";

// Zod schema for registration form validation
const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
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

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registration Data:", data);
    // Perform registration logic here
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
