import { NextRequest, NextResponse } from "next/server";
import { authSessionCookieBase } from "@/lib/authSessionCookies";

const BE_URL = process.env.API_URL ?? "https://giaothoatech.cloud/api";

export async function POST(req: NextRequest) {
  const cookieOpts = authSessionCookieBase(req);
  const body = await req.json();
  let beRes: Response;
  try {
    beRes = await fetch(`${BE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { message: "Cannot connect to server" },
      { status: 503 },
    );
  }

  const data = await beRes.json().catch(() => ({}));
  const res = NextResponse.json(data, { status: beRes.status });

  if (beRes.ok && data?.data?.accessToken) {
    const { accessToken, user } = data.data;
    res.cookies.set("auth_token", accessToken, {
      httpOnly: true,
      ...cookieOpts,
    });
    if (user && typeof user === "object") {
      res.cookies.set("auth_user", JSON.stringify(user), {
        httpOnly: false,
        ...cookieOpts,
      });
    }
  }

  return res;
}
