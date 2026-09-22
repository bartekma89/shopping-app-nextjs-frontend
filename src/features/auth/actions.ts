"use server";

import { redirect } from "next/navigation";
import { post } from "@/lib/api/client";
import { parseCredentials, toErrorState } from "./credentials";
import type { User, UserState } from "./types";

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
