import type { UserState } from "./types";

export const initialAuthState: UserState = {
  errors: {},
  message: null,
  values: { email: "" },
};
