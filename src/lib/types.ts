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
