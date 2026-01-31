"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConvexAuth } from "convex/react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import SearchInput from "@/components/search-input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout successful");
          router.refresh();
          router.push("/");
        },
        onError: (err) => {
          toast.error(err.error.message);
        },
      },
    });
  };

  return (
    <nav className="w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Left: Brand + Navigation */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold">
            Next<span className="text-primary">Pro</span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/blog">Blog</NavItem>
              <NavItem href="/create">Create</NavItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block w-[220px]">
            <SearchInput />
          </div>

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Link href="/auth/sign-up" className={buttonVariants()}>
                    Sign up
                  </Link>
                  <Link
                    href="/auth/login"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Login
                  </Link>
                </>
              )}
            </>
          )}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

/* --------------------------------- */
/* Reusable Nav Item                  */
/* --------------------------------- */
function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 px-4"
          )}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export default Navbar;
