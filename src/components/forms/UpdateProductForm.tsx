import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { useGetProductQuery, useUpdateProductMutation } from "../../store/api";
import { updateProductSchema } from "../../zodSchemas/commonSchema";
import FileInput from "../reusableInputTags/FileInput";
import NumberInput from "../reusableInputTags/NumberInput";
import SelectInput from "../reusableInputTags/SelectInput";
import TextInput from "../reusableInputTags/TextInput";
import TextareaInput from "../reusableInputTags/TextareaInput";

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

const UpdateProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductQuery(id as string);
  const [updateProduct] = useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: "",
      brand: "",
      productModel: "",
      price: 0,
      stock: 0,
      category: "",
      image: undefined,
      description: "",
    },
  });

  // Set default values when product data is available
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        brand: product.brand,
        productModel: product.productModel,
        price: product.price,
        stock: product.stock,
        category: product.category,
        description: product.description,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: UpdateProductFormData) => {
    try {
      const res = updateProduct({ id, ...data }).unwrap();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product", { id: "updateProductError" });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Update Product :{" "}
        <strong>
          <i className="break-words">{id}</i>
        </strong>
      </h2>

      {/* Product Name */}
      <TextInput
        name="name"
        control={control}
        label="Product Name"
        placeholder="Enter product name"
        error={errors.name?.message}
      />

      {/* Brand */}
      <TextInput
        name="brand"
        control={control}
        label="Brand"
        placeholder="Enter brand name"
        error={errors.brand?.message}
      />

      {/* Model */}
      <TextInput
        name="productModel"
        control={control}
        label="Model"
        placeholder="Enter model name"
        error={errors.productModel?.message}
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

      {/* Description */}
      <TextareaInput
        name="description"
        control={control}
        label="Description"
        placeholder="Enter product description"
      />

      {/* Image Upload */}
      <FileInput
        name="image"
        control={control}
        label="Update Product Image"
        error={errors.image?.message}
        setValue={setValue}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-600 text-white font-medium rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
