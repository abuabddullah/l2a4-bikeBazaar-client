import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters long"),
  brand: z.string().min(2, "Brand name must be at least 2 characters long"),
  price: z.number().positive("Price must be a positive number"),
  productModel: z
    .string()
    .min(2, "Product model must be at least 2 characters long"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  category: z.string().min(2, "Category is required"),
  description: z.string().optional(),
  image: z.instanceof(File, { message: "Image is required" }).refine(
    (file) => {
      if (!(file instanceof File)) return false;
      return file.size <= 2 * 1024 * 1024;
    },
    { message: "File must be under 2MB." }
  ),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .optional(),
  brand: z
    .string()
    .min(2, "Brand name must be at least 2 characters long")
    .optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  productModel: z
    .string()
    .min(2, "Product model must be at least 2 characters long")
    .optional(),
  stock: z.number().int().min(0, "Stock cannot be negative").optional(),
  category: z.string().min(2, "Category is required").optional(),
  description: z.string().optional(),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => {
        if (!(file instanceof File)) return false;
        return file.size <= 2 * 1024 * 1024;
      },
      { message: "File must be under 2MB." }
    )
    .optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
});

export const changePassFormSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters."),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters."),
});
