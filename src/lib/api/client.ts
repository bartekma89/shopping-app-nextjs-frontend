import { GENERIC_ERROR } from "@/lib/constants";
import { env } from "@/lib/env";
import type { ApiResult, FieldErrors } from "./types";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type ApiErrorBody = {
  message?: string | string[];
  errors?: FieldErrors;
};

const setAuthHeader = async (response: Response) => {
  const setCookieHeader = response.headers.get("set-cookie");

  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];

    (await cookies()).set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};

const getHeaders = async () => {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
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

  await setAuthHeader(res);

  const data = res.status === 204 ? undefined : await res.json();

  return { ok: true, data: data as T };
}

export async function post<T>(path: string, body: unknown) {
  const headers = await getHeaders();
  return request<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  });
}

export async function get<T>(path: string) {
  const headers = await getHeaders();
  return request<T>(path, {
    method: "GET",
    headers,
  });
}
