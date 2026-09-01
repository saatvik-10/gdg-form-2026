import { z } from "zod";

export const personalDetailsSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
  prn: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "PRN must be exactly 10 digits"),
  year: z.string().min(1, "Please select a year"),
  branch: z.string().trim().min(2, "Branch is required"),
  dept: z.string().trim().min(2, "Department is required"),
});

export type PersonalDetails = z.infer<typeof personalDetailsSchema>;