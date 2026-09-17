"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createUser } from "@/lib/actions";
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

export default function SignupPage() {
  const [state, dispatchAction] = useActionState(createUser, {
    errors: {},
    message: null,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Create an account with your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={dispatchAction}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
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
              autoComplete="new-password"
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
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center gap-1 text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="text-foreground underline-offset-4 hover:underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
