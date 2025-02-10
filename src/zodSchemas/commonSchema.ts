import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  brand: z.string().min(2, "Product name must be at least 2 characters."),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be greater than 0.")
  ),
  productModel: z.string(),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Stock quantity must be at least 1.")
  ),
  category: z.string().min(1, "Category is required."),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, "File must be under 2MB.")
    .optional(),
  description: z.string().optional(),
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
