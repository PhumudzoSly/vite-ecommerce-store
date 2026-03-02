import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Invalid postal code"),
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number (16 digits)"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  saveInfo: z.boolean().default(false),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
