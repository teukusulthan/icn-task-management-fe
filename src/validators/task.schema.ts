import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  completed: z.boolean().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
