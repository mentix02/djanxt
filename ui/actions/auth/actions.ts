"use server";

import { refresh } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import {
  SigninData,
  SignupData,
  SigninFormState,
  SignupFormState,
  SigninDataSchema,
  SignupDataSchema,
} from "@/actions/auth/types";

export async function signUpAction(previousState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  const values: SignupData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await SignupDataSchema.safeParseAsync(values);

  if (!result.success) {
    const errors: SignupFormState["errors"] = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignupData;
      errors[field] = issue.message;
    });

    return { values, errors, non_field_errors: [] };
  }

  try {
    await auth.api.signUpEmail({ body: result.data });
  } catch (error) {
    const non_field_errors = (error as Error).message || "An unexpected error occurred. Please try again.";
    return { ...previousState, values, non_field_errors: [non_field_errors] };
  }

  refresh();
  redirect("/dashboard");
}

export async function signInAction(previousState: SigninFormState, formData: FormData): Promise<SigninFormState> {
  const values: SigninData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await SigninDataSchema.safeParseAsync(values);

  if (!result.success) {
    const errors: SigninFormState["errors"] = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SigninData;
      errors[field] = issue.message;
    });

    return { values, errors, non_field_errors: [] };
  }

  try {
    await auth.api.signInEmail({ body: result.data, headers: await headers() });
  } catch (error) {
    const non_field_errors = (error as Error).message || "An unexpected error occurred. Please try again.";
    return { ...previousState, values, non_field_errors: [non_field_errors] };
  }

  refresh();
  redirect("/dashboard");
}
