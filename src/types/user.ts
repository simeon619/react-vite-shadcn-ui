import * as z from "zod";

export const RegisterFormSchema = z.object({
    pseudo: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      }),
    password: z
      .string({
        required_error: "Password is required.",
      })
      .describe("Your secure password")
      .min(2, {
        message: "Password must be at least 2 characters.",
      }),
  });
  export type registerFormType = z.infer<typeof RegisterFormSchema>;