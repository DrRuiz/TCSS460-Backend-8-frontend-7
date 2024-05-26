import { z } from "zod";

export const addRatingFormSchema = z.object({
  isbn13: z.string().min(1, { message: "An Isbn13 number is required" }).trim(),
  rating: z.string().regex(/^[1-5]/, { message: "Rating only [1-5] are valid" }),
});

export type addRatingFormSchema = z.infer<typeof addRatingFormSchema>;

export type FormState =
  | {
      errors?: {
        isbn13?: string[];
        rating?: string[];
      };
    }
  | undefined;