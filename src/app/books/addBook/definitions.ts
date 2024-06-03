import { z } from "zod";

export const addRatingFormSchema = z.object({
  id: z.number().min(1, { message: "ID number is required"}),
  isbn13: z.string().min(1, { message: "An ISBN13 number is required" }).trim(),
  author: z.string().min(1, { message: "An Author number is required" }).trim(),
  year: z.number().min(1, { message: "Publication Year is required"}).max(2025, { message: "Publication Year cannot be in the future"}),
  title: z.string().min(1, { message: "A Title number is required" }).trim()
});

export type addRatingFormSchema = z.infer<typeof addRatingFormSchema>;

export type FormState =
  | {
      errors?: {
        isbn13?: string[];
        id?: string[];
        year?: string[];
        author?: string[];
        title?: string[];
      };
    }
  | undefined;