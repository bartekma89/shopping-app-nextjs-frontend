"use server";

import { redirect } from "next/navigation";
import { flattenError, z } from "zod";

import { env } from "@/lib/env";
import { ApiErrorResponse, UserState } from "./types";
import { GENERIC_ERROR } from "./constants";

const UserSchema = z.object({
  email: z.email({
    error: "Enter a valid email",
  }),
  password: z.string({ error: "Password required" }).min(1, {
    error: "Password required",
  }),
});

export async function createUser(
  _prevState: UserState,
  formData: FormData,
): Promise<UserState> {
  const validatedFields = UserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      message: null,
      errors: flattenError(validatedFields.error).fieldErrors,
    };
  }

  let res: Response;
  try {
    res = await fetch(`${env.API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
      headers: {
        "content-type": "application/json",
      },
    });
  } catch {
    return { message: GENERIC_ERROR, errors: {} };
  }

  if (!res.ok) {
    const body: ApiErrorResponse = await res.json();
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message;

    return {
      message: message ?? GENERIC_ERROR,
      errors: body.errors ?? {},
    };
  }

  redirect("/");
}
