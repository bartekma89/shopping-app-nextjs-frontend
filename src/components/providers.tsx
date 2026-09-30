import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

interface ProviderProps {
  children: ReactNode[] | ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};
