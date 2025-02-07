"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { productSchema } from "../../zodSchemas/commonSchema";
import FileInput from "../reusableInputTags/FileInput";
import NumberInput from "../reusableInputTags/NumberInput";
import SelectInput from "../reusableInputTags/SelectInput";
import TextInput from "../reusableInputTags/TextInput";

type ProductFormData = z.infer<typeof productSchema>;

const AddProductForm = () => {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      price: 0,
      stock: 0,
      category: "",
      password: "",
      image: undefined,
    },
  });

  const onSubmit = (data: ProductFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Product Name */}
      <TextInput
        name="productName"
        control={control}
        label="Product Name"
        placeholder="Enter product name"
        error={errors.productName?.message}
      />

      {/* Price */}
      <NumberInput
        name="price"
        control={control}
        label="Price ($)"
        error={errors.price?.message}
      />

      {/* Stock */}
      <NumberInput
        name="stock"
        control={control}
        label="Stock Quantity"
        error={errors.stock?.message}
      />

      {/* Category */}
      <SelectInput
        name="category"
        control={control}
        label="Category"
        options={[
          { value: "city", label: "City" },
          { value: "road", label: "Road" },
          { value: "mountain", label: "Mountain" },
        ]}
        error={errors.category?.message}
      />

      {/* Image Upload */}
      <FileInput
        name="image"
        control={control}
        label="Product Image"
        error={errors.image?.message}
        setValue={setValue}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-600 text-white font-medium rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
