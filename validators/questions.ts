import { z } from "zod";

export const answersSchema = z.array(
  z.string().trim().min(2, "Answer must be at least 2 characters")
);