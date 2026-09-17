export type UserState = {
  errors: {
    email?: string[];
    password?: string[];
  };
  message: string | null;
};

export type ApiErrorResponse = {
  message?: string | string[];
  errors?: UserState["errors"];
};
