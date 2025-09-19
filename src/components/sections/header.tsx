"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Microscope, FlaskConical, Calculator } from "lucide-react";

import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
const CLERK_ENABLED = typeof process !== 'undefined' && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1758195560046.png";

const subjects = [
  {
    title: "Biology",
    href: "/a-level-biology",
    icon: Microscope,
    alt: "Biology",
  },
  {
    title: "Chemistry",
    href: "/a-level-chemistry",
    icon: FlaskConical,
    alt: "Chemistry",
  },
  {
    title: "Maths",
    href: "/a-level-maths",
    icon: Calculator,
    alt: "Maths",
  },
];

const aboutLinks = [
  { title: "About Us", href: "/about-us" },
  { title: "Predicted Papers", href: "/about-us/predicted-papers" },
  { title: "A/A* Guarantee", href: "/about-us/guarantee" },
  { title: "Parents", href: "/about-us/tuition" },
  { title: "Results", href: "/results" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contact", href: "/contact" },
];

const navLinks = [
  { title: "Pricing", href: "/pricing/" },
  { title: "Private Tutoring", href: "/private-tutoring/contact" },
  { title: "September Free", href: "/september-free/" },
  { title: "Dashboard", href: "/dashboard" },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-[0_2px_5px_rgba(0,0,0,0.1)]">
      <nav className="container mx-auto flex h-[90px] items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Homepage">
          <span className="text-2xl font-semibold tracking-tight text-primary">Tutor Lab</span>
        </Link>
        <div className="hidden lg:flex flex-grow items-center justify-center">
            <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-foreground text-base font-semibold hover:text-primary focus:text-primary data-[state=open]:text-primary">
                    Subjects
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid w-[260px] gap-1 p-3">
                    {subjects.map((subject) => (
                        <li key={subject.title}>
                        <NavigationMenuLink asChild>
                            <a
                            href={subject.href}
                            className="flex items-center gap-4 rounded-md p-3 text-base font-semibold leading-none text-foreground no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                            >
                            <subject.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                            {subject.title}
                            </a>
                        </NavigationMenuLink>
                        </li>
                    ))}
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-foreground text-base font-semibold hover:text-primary focus:text-primary data-[state=open]:text-primary">
                        About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-3">
                        {aboutLinks.map((link) => (
                            <li key={link.title}>
                            <NavigationMenuLink asChild>
                                <a
                                href={link.href}
                                className="block select-none rounded-md p-3 text-base font-semibold leading-none text-foreground no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
                                >
                                {link.title}
                                </a>
                            </NavigationMenuLink>
                            </li>
                        ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                
                {navLinks.map((link) => (
                    <NavigationMenuItem key={link.title}>
                        <Link href={link.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent text-foreground text-base font-semibold hover:text-primary focus:text-primary data-[state=open]:text-primary")}>
                                {link.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            </NavigationMenu>
        </div>


        <div className="hidden lg:flex items-center gap-2">
          {CLERK_ENABLED ? <SignedOut>
            <Button
              variant="outline"
              asChild
              className="border-primary text-primary h-auto py-3 px-6 text-base font-semibold rounded-md hover:bg-primary/20 hover:text-primary transition-colors"
            >
              <Link href="/login">Log In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-primary-foreground h-auto py-3 px-6 text-base font-semibold rounded-md hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
            >
              <Link href="/register">Start Free</Link>
            </Button>
          </SignedOut> : <>
            <Button variant="outline" asChild className="border-primary text-primary h-auto py-3 px-6 text-base font-semibold rounded-md hover:bg-primary/20 hover:text-primary transition-colors">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-primary-foreground h-auto py-3 px-6 text-base font-semibold rounded-md hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
              <Link href="/register">Start Free</Link>
            </Button>
          </>}
          {CLERK_ENABLED && (
            <SignedIn>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9" } }} afterSignOutUrl="/" />
            </SignedIn>
          )}
        </div>

        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-accent" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-l-border w-full max-w-sm p-0">
              <SheetHeader className="flex flex-row justify-between items-center p-5 border-b border-border h-[90px]">
                <Link href="/" onClick={() => setIsOpen(false)} aria-label="Homepage">
                  <span className="text-2xl font-semibold tracking-tight text-primary">Tutor Lab</span>
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-accent" aria-label="Close menu">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <div className="p-5 flex flex-col justify-between h-[calc(100%-90px)]">
                <nav className="flex flex-col gap-1 text-base font-medium text-foreground">
                    <details className="group">
                        <summary className="flex items-center justify-between py-3 list-none cursor-pointer">
                        Subjects
                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col">
                        {subjects.map((s) => (<Link key={s.title} href={s.href} onClick={() => setIsOpen(false)} className="py-2.5"> {s.title} </Link>))}
                        </div>
                    </details>
                    <details className="group">
                        <summary className="flex items-center justify-between py-3 list-none cursor-pointer">
                        About
                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="pl-4 flex flex-col">
                        {aboutLinks.map((l) => (<Link key={l.title} href={l.href} onClick={() => setIsOpen(false)} className="py-2.5"> {l.title} </Link>))}
                        </div>
                    </details>
                    {navLinks.map((l) => (<Link key={l.title} href={l.href} onClick={() => setIsOpen(false)} className="py-3"> {l.title} </Link>))}
                </nav>
                <div className="flex flex-col gap-4">
                  {CLERK_ENABLED ? <SignedOut>
                    <Button variant="outline" asChild className="w-full border-primary text-primary text-base font-semibold py-3 rounded-md hover:bg-primary/20 hover:text-primary">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                    </Button>
                  </SignedOut> : <Button variant="outline" asChild className="w-full border-primary text-primary text-base font-semibold py-3 rounded-md hover:bg-primary/20 hover:text-primary">
                      <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                    </Button>}
                  {CLERK_ENABLED ? <SignedOut>
                    <Button asChild className="w-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-primary-foreground text-base font-semibold py-3 rounded-md hover:opacity-90 shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
                      <Link href="/register" onClick={() => setIsOpen(false)}>Start Free</Link>
                    </Button>
                  </SignedOut> : <Button asChild className="w-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-primary-foreground text-base font-semibold py-3 rounded-md hover:opacity-90 shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
                      <Link href="/register" onClick={() => setIsOpen(false)}>Start Free</Link>
                    </Button>}
                  {CLERK_ENABLED && (
                    <SignedIn>
                      <div className="flex items-center justify-center py-2">
                        <UserButton appearance={{ elements: { userButtonAvatarBox: "h-9 w-9" } }} afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}