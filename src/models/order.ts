import { z } from "zod";

export const orderSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().optional(),
  email: z.string().min(1, "Required").email("Invalid email"),
  cardnumber: z
    .string()
    .min(1, "Required")
    .regex(/^(4\d{12}|4\d{15}|5\d{15})$/, "Invalid format"),
});

export type OrderSchema = z.infer<typeof orderSchema>;
