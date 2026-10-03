import { flattenError } from "zod";
import type { ApiError } from "@/lib/api/types";
import { userSchema } from "./schema";
import type { ParsedCredentials, UserState } from "./types";

export function parseCredentials(formData: FormData): ParsedCredentials {
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

export function toErrorState(
  error: ApiError,
  values: UserState["values"],
): UserState {
  const hasFieldErrors = Object.keys(error.fieldErrors).length > 0;

  return {
    message: hasFieldErrors ? null : error.message,
    errors: error.fieldErrors,
    values,
  };
}
