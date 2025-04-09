"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Search Flights", href: "/search" },
    { name: "Empty Legs", href: "/empty-legs" },
    { name: "How It Works", href: "/how-it-works" },
  ]

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SkyJet</span>
            <Image src="/skyjet-logo-dark.png" alt="SkyJet Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href ? "text-black" : "text-gray-600 hover:text-black",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="bg-black text-white hover:bg-black/90">
                  Sign up
                </Button>
              </SignUpButton>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">SkyJet</span>
                <Image src="/skyjet-logo-dark.png" alt="SkyJet Logo" width={120} height={40} className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                        pathname === item.href
                          ? "bg-gray-50 text-black"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  {isSignedIn ? (
                    <div className="flex items-center -mx-3 px-3 py-2.5">
                      <UserButton afterSignOutUrl="/" />
                      <span className="ml-3">{user?.fullName || user?.username}</span>
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-black">
                          Log in
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium bg-black text-white hover:bg-black/90">
                          Sign up
                        </button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
