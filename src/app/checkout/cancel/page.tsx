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

export const metadata = { title: "Payment cancelled" };

export default function CheckoutCancelPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment cancelled</CardTitle>
        <CardDescription>You can try again anytime.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">No charges were made.</p>
      </CardContent>
      <CardFooter>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Back to products
        </Link>
      </CardFooter>
    </Card>
  );
}
