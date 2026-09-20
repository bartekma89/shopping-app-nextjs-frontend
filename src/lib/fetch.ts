import { GENERIC_ERROR } from "./constants";
import { env } from "./env";

export type FieldErrors = Record<string, string[] | undefined>;

export type ApiError = {
  ok: false;
  message: string;
  fieldErrors: FieldErrors;
};

export type ApiResult<T> = { ok: true; data: T } | ApiError;

type ApiErrorBody = {
  message?: string | string[];
  errors?: FieldErrors;
};

async function request<T>(
  path: string,
  init: RequestInit,
): Promise<ApiResult<T>> {
  let res: Response;

  try {
    res = await fetch(`${env.API_URL}/${path}`, init);
  } catch {
    return { ok: false, message: GENERIC_ERROR, fieldErrors: {} };
  }

  if (!res.ok) {
    const body: ApiErrorBody = await res.json().catch(() => ({}));
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message;

    return {
      ok: false,
      message: message ?? GENERIC_ERROR,
      fieldErrors: body.errors ?? {},
    };
  }

  const data = res.status === 204 ? undefined : await res.json();

  return { ok: true, data: data as T };
}

export function post<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
}
