"use client";

import { useActionState } from "react";
import { createProduct } from "@/features/products/actions";
import type { ProductState } from "@/features/products/types";
import { mapErrorsToFields } from "@/lib/helpers";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

interface CreateProductFormProps {
  onClose: () => void;
}

export const CreateProductForm = ({ onClose }: CreateProductFormProps) => {
  const actionForm = async (prevState: ProductState, formData: FormData) => {
    const result = await createProduct(prevState, formData);

    if (result.success) {
      onClose();
      toast.add(
        result.message
          ? {
              type: "warning",
              title: "Product created without image",
              description: result.message,
            }
          : {
              type: "success",
              title: "Product created",
            },
      );
    }

    return result;
  };

  const [state, formAction, pending] = useActionState(actionForm, {
    errors: {},
    message: null,
    values: { name: "", description: "", priceCents: "" },
  });

  return (
    <form
      key={JSON.stringify(state.values)}
      className="space-y-4"
      action={formAction}
    >
      <FieldGroup>
        <Field data-invalid={!!state.errors.name?.length}>
          <FieldLabel htmlFor="name">Product Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Product name"
            defaultValue={state.values?.name}
            aria-describedby="name-error"
            aria-invalid={!!state.errors.name?.length}
          />
          <FieldError
            id="name-error"
            errors={mapErrorsToFields(state.errors.name)}
          />
        </Field>
        <Field data-invalid={!!state.errors.description?.length}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input
            id="description"
            name="description"
            placeholder="Product description"
            defaultValue={state.values?.description}
            aria-describedby="description-error"
            aria-invalid={!!state.errors.description?.length}
          />
          <FieldError
            id="description-error"
            errors={mapErrorsToFields(state.errors.description)}
          />
        </Field>
        <Field data-invalid={!!state.errors.priceCents?.length}>
          <FieldLabel htmlFor="priceCents">Price</FieldLabel>
          <Input
            id="priceCents"
            name="priceCents"
            placeholder="Product price"
            defaultValue={state.values?.priceCents}
            aria-describedby="priceCents-error"
            aria-invalid={!!state.errors.priceCents?.length}
            inputMode="decimal"
          />
          <FieldError
            id="priceCents-error"
            errors={mapErrorsToFields(state.errors.priceCents)}
          />
        </Field>
        <Field>
          <FieldLabel>Image</FieldLabel>
          <Input type="file" name="image" accept="image/*" />
          <FieldDescription>Select a picture to upload</FieldDescription>
          <FieldError
            id="image-error"
            errors={mapErrorsToFields(state.errors.image)}
          />
        </Field>
        <FieldError id="form-error">{state.message}</FieldError>
      </FieldGroup>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
};
