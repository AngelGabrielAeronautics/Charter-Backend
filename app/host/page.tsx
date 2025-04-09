import Link from "next/link"
import Image from "next/image"
import { Shield, Star, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HostPage() {
  const benefits = [
    {
      icon: <DollarSign className="h-10 w-10 text-primary" />,
      title: "Earn Revenue",
      description: "Generate income from your aircraft when you're not using it.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Insurance Coverage",
      description: "All bookings include comprehensive insurance protection.",
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: "Full Control",
      description: "Set your own availability, pricing, and booking requirements.",
    },
  ]

  const steps = [
    {
      number: 1,
      title: "List your aircraft",
      description: "Create a detailed listing with photos, specifications, and availability.",
    },
    {
      number: 2,
      title: "Set your terms",
      description: "Define your pricing, cancellation policy, and booking requirements.",
    },
    {
      number: 3,
      title: "Approve bookings",
      description: "Review and approve booking requests from qualified clients.",
    },
    {
      number: 4,
      title: "Get paid",
      description: "Receive secure payments directly to your account after each trip.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/placeholder.svg?height=40&width=40&query=SkyCharter logo"
              alt="SkyCharter Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-bold text-xl">SkyCharter</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/aircraft" className="text-sm font-medium hover:text-primary">
              Browse Aircraft
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/host" className="text-sm font-medium text-primary">
              List Your Aircraft
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920&query=private jet hangar with multiple aircraft"
              alt="Private jet hangar"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="container mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">List Your Aircraft and Earn</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of aircraft owners who are maximizing their investment by listing on SkyCharter
            </p>
            <Button size="lg" className="bg-primary text-white">
              Start Listing Your Aircraft
            </Button>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why List Your Aircraft With Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                SkyCharter provides aircraft owners with a secure platform to generate revenue from their investment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Listing your aircraft is simple and straightforward</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="bg-primary text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

                <Tabs defaultValue="eligibility" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="safety">Safety</TabsTrigger>
                  </TabsList>
                  <TabsContent value="eligibility" className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">What types of aircraft can I list?</h3>
                        <p className="text-gray-600">
                          You can list any private aircraft that meets our safety standards, including jets, turboprops,
                          and helicopters.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Do I need to be a certified operator?</h3>
                        <p className="text-gray-600">
                          Yes, all aircraft must be operated by certified pilots and comply with all relevant aviation
                          regulations.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">What documentation do I need?</h3>
                        <p className="text-gray-600">
                          You'll need to provide proof of ownership, insurance, maintenance records, and operator
                          certificates.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="earnings" className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">How much can I earn?</h3>
                        <p className="text-gray-600">
                          Earnings vary based on your aircraft type, location, and availability. Many owners earn enough
                          to offset a significant portion of their ownership costs.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">How do I get paid?</h3>
                        <p className="text-gray-600">
                          Payments are processed securely through our platform and transferred directly to your bank
                          account after each completed booking.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">What fees does SkyCharter charge?</h3>
                        <p className="text-gray-600">
                          SkyCharter charges a 15% service fee on each booking, which covers marketing, payment
                          processing, and platform maintenance.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="safety" className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">How are clients vetted?</h3>
                        <p className="text-gray-600">
                          All clients undergo identity verification and background checks before being allowed to book
                          aircraft.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">What insurance coverage is provided?</h3>
                        <p className="text-gray-600">
                          SkyCharter provides comprehensive insurance coverage for all bookings, including liability and
                          hull coverage.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Can I decline booking requests?</h3>
                        <p className="text-gray-600">
                          Yes, you have full control over who can book your aircraft and can decline any request that
                          doesn't meet your requirements.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=1000&width=800&query=business jet owner with tablet managing bookings"
                  alt="Aircraft owner managing bookings"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our network of aircraft owners and start generating revenue from your investment
            </p>
            <Button size="lg" variant="secondary">
              List Your Aircraft Now
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SkyCharter</h3>
              <p className="text-sm text-gray-600">The easiest way to book private aircraft charters worldwide.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-gray-600 hover:text-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-gray-600 hover:text-primary">
                    Safety Information
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-primary">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} SkyCharter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
