"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { initialAuthState } from "@/features/auth/constants";
import type { AuthFormAction } from "@/features/auth/types";
import { mapErrorsToFields } from "@/lib/helpers";

interface AuthFormProps {
  autoCompleteType: "new" | "current";
  buttonLabel: {
    basic: string;
    pending: string;
  };
  action: AuthFormAction;
}

export const AuthForm = ({
  buttonLabel,
  autoCompleteType,
  action,
}: AuthFormProps) => {
  const [state, formAction, pending] = useActionState(action, initialAuthState);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <FieldGroup>
        <Field data-invalid={!!state.errors.email?.length}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            defaultValue={state.values.email}
            autoComplete="email"
            aria-describedby="email-error"
          />
          <FieldError
            id="email-error"
            errors={mapErrorsToFields(state.errors.email)}
          />
        </Field>
        <Field data-invalid={!!state.errors.password?.length}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={`${autoCompleteType}-password`}
            aria-describedby="password-error"
          />
          <FieldError
            id="password-error"
            errors={mapErrorsToFields(state.errors.password)}
          />
        </Field>
        <FieldError id="form-error">{state.message}</FieldError>
        <Field>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? buttonLabel.pending : buttonLabel.basic}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};
