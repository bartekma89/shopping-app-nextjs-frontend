"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { post } from "@/lib/api/client";
import { AUTHENTICATION_COOKIE } from "@/lib/constants";
import { parseCredentials, toErrorState } from "./credentials";
import type { AuthFormAction, User } from "./types";

export const createUser: AuthFormAction = async (_prevState, formData) => {
  const credentials = parseCredentials(formData);

  if (!credentials.success) {
    return credentials.state;
  }

  const result = await post<User>("users", credentials.data);

  if (!result.ok) {
    return toErrorState(result, credentials.values);
  }

  redirect("/");
};

export const loginUser: AuthFormAction = async (_prevState, formData) => {
  const credentials = parseCredentials(formData);

  if (!credentials.success) {
    return credentials.state;
  }

  const result = await post<User>("auth/login", credentials.data);

  if (!result.ok) {
    return toErrorState(result, credentials.values);
  }

  redirect("/");
};

export async function logout() {
  (await cookies()).delete(AUTHENTICATION_COOKIE);

  redirect("/login");
}
