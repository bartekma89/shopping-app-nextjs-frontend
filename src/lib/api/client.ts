import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE, GENERIC_ERROR } from "@/lib/constants";
import { env } from "@/lib/env";
import type { ApiErrorBody, ApiResult, FetchResult } from "./types";

const getHeaders = async () => {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
};

async function apiFetch<T>(
  path: string,
  init: RequestInit,
): Promise<FetchResult<T>> {
  let response: Response;

  try {
    response = await fetch(`${env.API_URL}/${path}`, init);
  } catch {
    return { ok: false, message: GENERIC_ERROR, fieldErrors: {} };
  }

  if (!response.ok) {
    const body: ApiErrorBody = await response.json().catch(() => ({}));
    const message = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message;

    return {
      ok: false,
      message: message ?? GENERIC_ERROR,
      fieldErrors: body.errors ?? {},
    };
  }

  const data = response.status === 204 ? undefined : await response.json();

  return { ok: true, data: data as T, response };
}

const toApiResult = <T>(result: FetchResult<T>): ApiResult<T> =>
  result.ok ? { ok: true, data: result.data } : result;

const persistAuthCookie = async (response: Response) => {
  const setCookieHeader = response.headers.get("set-cookie");

  if (!setCookieHeader) {
    return;
  }

  const token = setCookieHeader.split(";")[0].split("=")[1];
  const { exp } = jwtDecode(token);

  (await cookies()).set({
    name: AUTHENTICATION_COOKIE,
    value: token,
    secure: true,
    httpOnly: true,
    ...(exp && { expires: new Date(exp * 1000) }),
  });
};

export async function get<T>(
  path: string,
  tags?: string[],
): Promise<ApiResult<T>> {
  const headers = await getHeaders();

  const result = await apiFetch<T>(path, {
    method: "GET",
    headers,
    next: { tags },
  });

  return toApiResult(result);
}

export async function post<T>(
  path: string,
  body: unknown,
): Promise<ApiResult<T>> {
  const headers = await getHeaders();
  const isFormData = body instanceof FormData;

  const result = await apiFetch<T>(path, {
    method: "POST",
    body: isFormData ? body : JSON.stringify(body),
    headers: isFormData
      ? headers
      : {
          "content-type": "application/json",
          ...headers,
        },
  });

  if (result.ok) {
    await persistAuthCookie(result.response);
  }

  return toApiResult(result);
}
