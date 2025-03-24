import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import toast from "react-hot-toast";
import { useGetProfileQuery } from "../../store/api";
import { useAppSelector } from "../../store/hooks";
import { selectUserToken } from "../../store/slices/authSlice";
import { updateProfileSchema } from "../../zodSchemas/commonSchema";
import TextInput from "../reusableInputTags/TextInput";
import TextareaInput from "../reusableInputTags/TextareaInput";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const UpdateProfileForm = () => {
  const token = useAppSelector(selectUserToken);
  const { data: profile, isLoading } = useGetProfileQuery(undefined);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: profile?.name || "asif",
      avatar:
        profile?.avatar ||
        "https://res.cloudinary.com/dglsw3gml/image/upload/v1742799359/bicycle-shop/avatar_jrnud5.jpg",
      phone: profile?.phone || "01700000000",
      address: profile?.address || "Dhaka, Bangladesh",
      email: profile?.email || "asif@asif.asif",
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    console.log("Form Data:", data);
    try {
      const response = await fetch(
        "https://l2a4-bike-bazaar-server.vercel.app/api/users/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("Failed to update profile", {
          id: "profile-update",
        });
        throw new Error("Failed to update profile");
      }
      const resData = await response.json();
      console.log("🚀 ~ onSubmit ~ resData", resData);
      toast.success("Profile updated successfully", {
        id: "profile-update",
      });
      if (profile?.role === "customer") {
        window.location.href = "/dashboard/customer";
      } else if (profile?.role === "admin") {
        window.location.href = "/dashboard/admin/profile";
      }
    } catch (error) {
      toast.error("Failed to update profile", {
        id: "profile-update",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;

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

      {/* User Avatar */}
      <TextInput
        name="avatar"
        control={control}
        label="avatar"
        placeholder="Enter Avatar Url"
        error={errors.avatar?.message}
      />
      <TextInput
        name="phone"
        control={control}
        label="Phone"
        placeholder="Enter phone"
        error={errors.phone?.message}
      />
      <TextareaInput
        name="address"
        control={control}
        label="Sddress"
        placeholder="Enter address"
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
