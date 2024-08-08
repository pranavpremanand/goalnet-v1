import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email format",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password format",
    })
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(16, "Password cannot be longer than 16 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export const PostSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Image is required"),
  // isBanner: z.boolean(),
  // otherLinks: z.string(),
});

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Category name cannot be longer than 30 characters")
});
