import type { z } from "zod";
import type { userSchema } from "./schema";

export type User = {
  id: number;
  email: string;
};

export type UserState = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message: string | null;
  values: {
    email: string;
    password?: string;
  };
};

export type ParsedCredentials =
  | {
      success: true;
      data: z.infer<typeof userSchema>;
      values: UserState["values"];
    }
  | { success: false; state: UserState };
