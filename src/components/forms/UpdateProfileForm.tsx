"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateProfileSchema } from "../../zodSchemas/commonSchema";
import TextInput from "../reusableInputTags/TextInput";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const UpdateProfileForm = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "asif",
      email: "asif@asif.asif",
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* User Name */}
      <TextInput
        name="name"
        control={control}
        label="Name"
        placeholder="Enter User name"
        error={errors.name?.message}
      />

      {/* email */}
      <TextInput
        name="email"
        control={control}
        label="Email"
        placeholder="Enter email"
        error={errors.email?.message}
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

export default UpdateProfileForm;
