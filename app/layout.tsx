import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { TanStackQueryProvider } from "@/providers/query-provider"
import { ClerkAuthProvider } from "@/providers/clerk-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkyJet | Private Aircraft Booking",
  description: "Book private jets and charter flights worldwide",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkAuthProvider>
          <TanStackQueryProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </TanStackQueryProvider>
        </ClerkAuthProvider>
      </body>
    </html>
  )
}


import './globals.css'