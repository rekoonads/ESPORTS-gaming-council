"use client";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, Button } from "@/components";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center gap-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          GameHub
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/reviews" className="px-4 py-2">Reviews</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/news" className="px-4 py-2">News</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/guides" className="px-4 py-2">Guides</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" variant="ghost">Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}