import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUser } from "@/features/auth/actions";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm
          action={loginUser}
          autoCompleteType="current"
          buttonLabel={{
            basic: "Login",
            pending: "Logging in…",
          }}
        />
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
