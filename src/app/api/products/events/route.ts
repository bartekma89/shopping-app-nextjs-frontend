import { getHeaders } from "@/lib/api/client";
import { GENERIC_ERROR } from "@/lib/constants";
import { env } from "@/lib/env";

export async function GET(req: Request) {
  const headers = await getHeaders();
  let upstream: Response;

  try {
    upstream = await fetch(`${env.API_URL}/products/events`, {
      headers,
      signal: req.signal,
    });
  } catch {
    return Response.json(
      {
        error: GENERIC_ERROR,
      },
      {
        status: 502,
      },
    );
  }

  if (!upstream.ok) {
    return Response.json(
      {
        error: "Could not connect to product events",
      },
      {
        status: upstream.status,
      },
    );
  }

  if (!upstream.body) {
    return Response.json(
      { error: GENERIC_ERROR },
      {
        status: 502,
      },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
