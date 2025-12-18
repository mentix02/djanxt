import z from "zod";

const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password must be at most 128 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const SignupDataSchema = z.object({
  password: PasswordSchema,
  email: z.email("Invalid email address"),
  name: z.string().nonempty("Full name is required").max(255, "Full name must be at most 255 characters long"),
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

export const UpdatePersonalInfoSchema = z.object({
  name: z.string().nonempty("Full name is required"),
});

export const SetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
  });

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required."),
    newPassword: PasswordSchema,
    newPasswordConfirm: z.string().nonempty("New password is required."),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    error: "Passwords do not match.",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    error: "New password must be different from the current password.",
  });

export type SetPasswordData = z.infer<typeof SetPasswordSchema>;

export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;

export type UpdatePersonalInfoData = z.infer<typeof UpdatePersonalInfoSchema>;
