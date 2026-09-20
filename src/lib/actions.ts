"use server";

import { redirect } from "next/navigation";
import { flattenError, z } from "zod";
import { type ApiError, post } from "./fetch";
import type { UserState } from "./types";

const userSchema = z.object({
  email: z.email({
    error: "Enter a valid email",
  }),
  password: z.string({ error: "Password required" }).min(1, {
    error: "Password required",
  }),
});

type User = {
  id: number;
  email: string;
};

export async function createUser(
  _prevState: UserState,
  formData: FormData,
): Promise<UserState> {
  const credentials = parseCredentials(formData);

  if (!credentials.success) {
    return credentials.state;
  }

  const result = await post<User>("users", credentials.data);

  if (!result.ok) {
    return toErrorState(result, credentials.values);
  }

  redirect("/");
}

export async function loginUser(
  _prevState: UserState,
  formData: FormData,
): Promise<UserState> {
  const credentials = parseCredentials(formData);

  if (!credentials.success) {
    return credentials.state;
  }

  const result = await post<User>("auth/login", credentials.data);

  if (!result.ok) {
    return toErrorState(result, credentials.values);
  }

  redirect("/");
}

type ParsedCredentials =
  | {
      success: true;
      data: z.infer<typeof userSchema>;
      values: UserState["values"];
    }
  | { success: false; state: UserState };

function parseCredentials(formData: FormData): ParsedCredentials {
  const email = String(formData.get("email") ?? "");
  const values = { email };

  const validatedFields = userSchema.safeParse({
    email,
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      state: {
        message: null,
        errors: flattenError(validatedFields.error).fieldErrors,
        values,
      },
    };
  }

  return { success: true, data: validatedFields.data, values };
}

function toErrorState(error: ApiError, values: UserState["values"]): UserState {
  const hasFieldErrors = Object.keys(error.fieldErrors).length > 0;

  return {
    // a field-scoped error is rendered under its input, so don't repeat it
    message: hasFieldErrors ? null : error.message,
    errors: error.fieldErrors,
    values,
  };
}
