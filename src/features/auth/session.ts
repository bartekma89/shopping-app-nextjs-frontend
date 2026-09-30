import { cookies } from "next/headers";
import { cache } from "react";
import { get } from "@/lib/api/client";
import { AUTHENTICATION_COOKIE } from "@/lib/constants";
import type { User } from "./types";

export const hasAuthCookie = async () =>
  Boolean((await cookies()).get(AUTHENTICATION_COOKIE)?.value);

export const getIsAuthenticated = cache(hasAuthCookie);

export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!(await getIsAuthenticated())) {
    return null;
  }

  const result = await get<User>("users/me");

  return result.ok ? result.data : null;
});
