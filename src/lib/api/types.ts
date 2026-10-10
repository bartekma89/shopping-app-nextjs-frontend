export type FieldErrors = Record<string, string[] | undefined>;

export type ApiError = {
  ok: false;
  message: string;
  fieldErrors: FieldErrors;
};

export type ApiResult<T> = { ok: true; data: T } | ApiError;

export type ApiErrorBody = {
  message?: string | string[];
  errors?: FieldErrors;
};

export type FetchResult<T> =
  | { ok: true; data: T; response: Response }
  | ApiError;
