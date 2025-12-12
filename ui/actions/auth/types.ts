import z from "zod";

export const SignupDataSchema = z.object({
  email: z.email("Invalid email address"),
  name: z.string().nonempty("Full name is required").max(255, "Full name must be at most 255 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128, "Password must be at most 128 characters long"),
});

export type SignupData = z.infer<typeof SignupDataSchema>;

export type SignupFormState = FormState<SignupData>;

export const SigninDataSchema = z.object({
  rememberMe: z.boolean().optional(),
  email: z.email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export type SigninData = z.infer<typeof SigninDataSchema>;

export type SigninFormState = FormState<SigninData>;
