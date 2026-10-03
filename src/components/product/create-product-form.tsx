"use client";

import { useActionState } from "react";
import { createProduct } from "@/features/products/actions";
import type { ProductState } from "@/features/products/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/toast";

interface CreateProductFormProps {
  onClose: () => void;
}

export const CreateProductForm = ({ onClose }: CreateProductFormProps) => {
  const actionForm = async (prevState: ProductState, formData: FormData) => {
    const result = await createProduct(prevState, formData);

    if (result.success) {
      onClose();
      toast.add({
        type: "success",
        title: "Product created",
      });
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
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Product name"
          defaultValue={state.values?.name}
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors.name?.map((error) => (
            <p key={error} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Product description"
          defaultValue={state.values?.description}
          aria-describedby="description-error"
        />
        <div id="description-error" aria-live="polite" aria-atomic="true">
          {state.errors.description?.map((error) => (
            <p key={error} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceCents">Price</Label>
        <Input
          id="priceCents"
          name="priceCents"
          placeholder="Product price"
          defaultValue={state.values?.priceCents}
          aria-describedby="priceCents-error"
          inputMode="decimal"
        />
        <div id="priceCents-error" aria-live="polite" aria-atomic="true">
          {state.errors.priceCents?.map((error) => (
            <p key={error} className="text-sm text-destructive">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div id="form-error" aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
      </div>

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
