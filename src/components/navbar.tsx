"use client";

import { LayoutDashboard, LogOut, Menu, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/actions";
import type { User as AuthUser } from "@/features/auth/types";
import { navRoutes } from "@/lib/constants";

const toAccount = ({ email }: AuthUser) => {
  const name = email.split("@")[0];

  return { name, email, initials: name.slice(0, 2).toUpperCase() };
};

interface NavbarProps {
  user: AuthUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const isAuthenticated = user !== null;
  const account = user && toAccount(user);
  const links = navRoutes.filter(
    ({ visibility }) =>
      visibility === "public" || (visibility === "auth") === isAuthenticated,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <ShoppingBag className="size-5" />
          Shopping
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">
          {links.map(({ path, title }) => (
            <li key={path}>
              <Link
                href={path}
                className={buttonVariants({ variant: "ghost" })}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />

          {account ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  />
                }
              >
                <Avatar>
                  <AvatarFallback>{account.initials}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Open account menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-auto min-w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex items-center gap-2 px-1.5 py-1.5">
                    <Avatar>
                      <AvatarFallback>{account.initials}</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col overflow-hidden">
                      <span className="truncate text-sm font-medium text-foreground">
                        {account.name}
                      </span>
                      <span className="truncate text-xs">{account.email}</span>
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLinkItem render={<Link href="/profile" />}>
                    <User />
                    Profile
                  </DropdownMenuLinkItem>
                  <DropdownMenuLinkItem render={<Link href="/dashboard" />}>
                    <LayoutDashboard />
                    Dashboard
                  </DropdownMenuLinkItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Login
              </Link>
              <Link href="/signup" className={buttonVariants({ size: "sm" })}>
                Sign up
              </Link>
            </>
          )}

          {links.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="sm:hidden"
                render={<Button variant="outline" size="icon" />}
              >
                <Menu />
                <span className="sr-only">Open navigation</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-auto min-w-40">
                {links.map(({ path, title }) => (
                  <DropdownMenuLinkItem
                    key={path}
                    render={<Link href={path} />}
                  >
                    {title}
                  </DropdownMenuLinkItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
}
