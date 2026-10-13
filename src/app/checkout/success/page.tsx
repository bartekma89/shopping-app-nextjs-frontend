import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = { title: "Payment successful" };

export default function CheckoutSuccessPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment successful 🎉</CardTitle>
        <CardDescription>Thank you for your purchase.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          You will receive a confirmation from Stripe by email.
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/" className={buttonVariants()}>
          Back to products
        </Link>
      </CardFooter>
    </Card>
  );
}
