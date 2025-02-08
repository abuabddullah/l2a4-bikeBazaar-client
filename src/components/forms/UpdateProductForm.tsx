import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import FileInput from "../reusableInputTags/FileInput";
import NumberInput from "../reusableInputTags/NumberInput";
import SelectInput from "../reusableInputTags/SelectInput";
import TextInput from "../reusableInputTags/TextInput";

const updateProductSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters."),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Price must be at least 0.")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Stock quantity must be at least 0.")
  ),
  category: z.string().min(1, "Category is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, "File must be under 2MB.")
    .optional(),
});

type UpdateProductFormData = z.infer<typeof updateProductSchema>;

const UpdateProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  const onSubmit = (data: UpdateProductFormData) => {
    console.log("Updated Product Data:", data);
    // onsubmit e update product er api er kaj hobe
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        Update Product :{" "}
        <strong>
          <i>{id}</i>
        </strong>
      </h2>

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
        label="Update Product Image"
        error={errors.image?.message}
        setValue={setValue}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
