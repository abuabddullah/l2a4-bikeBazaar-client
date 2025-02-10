import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import toast from "react-hot-toast";
import { useAddProductMutation } from "../../store/api";
import { productSchema } from "../../zodSchemas/commonSchema";
import FileInput from "../reusableInputTags/FileInput";
import NumberInput from "../reusableInputTags/NumberInput";
import SelectInput from "../reusableInputTags/SelectInput";
import TextInput from "../reusableInputTags/TextInput";
import TextareaInput from "../reusableInputTags/TextareaInput";

type ProductFormData = z.infer<typeof productSchema>;

const AddProductForm = () => {
  const [addProduct] = useAddProductMutation();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      category: "",
      image: undefined,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    console.log("Form Data:", data);
    try {
      const res = await addProduct(data).unwrap();
      console.log({ res });
      reset();
      toast.success("Product added successfully", { id: "addProduct" });
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Product Name */}
      <TextInput
        name="name"
        control={control}
        label="Product Name"
        placeholder="Enter product name"
        error={errors.name?.message}
      />

      {/* Price */}
      <NumberInput
        name="price"
        control={control}
        label="Price ($)"
        error={errors.price?.message}
      />

      {/* Brand Name */}
      <TextInput
        name="brand"
        control={control}
        label="Brand Name"
        placeholder="Enter brand name"
        error={errors.brand?.message}
      />

      {/* productModel */}
      <TextInput
        name="productModel"
        control={control}
        label="Product Model"
        placeholder="Enter Model name"
        error={errors.productModel?.message}
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

      {/* Description */}
      <TextareaInput
        name="description"
        control={control}
        label="Description"
        placeholder="Enter Product Description..."
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
