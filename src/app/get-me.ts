import type { User } from "@/features/auth/types";
import { get } from "@/lib/api/client";

export const getMe = () => {
  return get<User>("users/me");
};
