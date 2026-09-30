"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/features/auth/actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginUser, {
    errors: {},
    message: null,
    values: { email: "" },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={formAction}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              defaultValue={state.values.email}
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email?.map((error) => (
                <p key={error} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              aria-describedby="password-error"
            />
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password?.map((error) => (
                <p key={error} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          </div>
          <div id="form-error" aria-live="polite" aria-atomic="true">
            {state?.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Logging in…" : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center gap-1 text-muted-foreground">
        Don&apos;t have an account?
        <Link
          href="/signup"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}
