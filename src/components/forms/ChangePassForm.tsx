import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../store/api";
import { changePassFormSchema } from "../../zodSchemas/commonSchema";
import PasswordInput from "../reusableInputTags/PasswordInput";

type ChangePassFormData = z.infer<typeof changePassFormSchema>;

const ChangePassForm = () => {
  const [changePassword] = useChangePasswordMutation();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ChangePassFormData>({
    resolver: zodResolver(changePassFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePassFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match", {
        id: "password-mismatch",
      });
      return;
    }
    try {
      const res = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      reset();
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Current Password */}
      <PasswordInput
        name="currentPassword"
        control={control}
        label="Current Password"
        error={errors.currentPassword?.message}
      />
      {/* newPassword */}
      <PasswordInput
        name="newPassword"
        control={control}
        label="New Password"
        error={errors.newPassword?.message}
      />
      {/* Confirm New Password */}
      <PasswordInput
        name="confirmPassword"
        control={control}
        label="Confirm New Password"
        error={errors.confirmPassword?.message}
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-600 text-white font-medium rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ChangePassForm;
