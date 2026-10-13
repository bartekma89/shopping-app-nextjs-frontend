import type { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 items-center justify-center p-4 min-h-svh">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
