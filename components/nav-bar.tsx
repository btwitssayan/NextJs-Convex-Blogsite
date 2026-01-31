"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConvexAuth } from "convex/react";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold">
            Next<span className="text-primary">Pro</span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/blog">Blog</NavItem>
                <NavItem href="/create">Create</NavItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right: Search + Auth + Theme Toggle + Mobile Trigger */}
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

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Menu
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <CloseIcon className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-4 py-4">
                <Link href="/" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                  Home
                </Link>
                <Link href="/blog" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                  Blog
                </Link>
                <Link href="/create" className={buttonVariants({ variant: "ghost", size: "lg" })}>
                  Create
                </Link>
                {isAuthenticated && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href={href} className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-4")}>
          {children}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export default Navbar;
