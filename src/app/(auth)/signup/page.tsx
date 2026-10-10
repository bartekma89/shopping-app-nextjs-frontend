import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createUser } from "@/features/auth/actions";
import { AuthForm } from "@/features/auth/components/auth-form";

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Create an account with your email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm
          action={createUser}
          autoCompleteType="new"
          buttonLabel={{
            basic: "Sign up",
            pending: "Signing up…",
          }}
        />
      </CardContent>
      <CardFooter className="justify-center gap-1 text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
