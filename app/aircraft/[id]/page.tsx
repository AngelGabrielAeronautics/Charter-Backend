import Link from "next/link"
import Image from "next/image"
import { Star, Users, Plane, Ruler, Calendar, MapPin, Shield, Award, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import BookingForm from "@/components/booking-form"

// Mock data for a single aircraft
const aircraft = {
  id: 1,
  name: "Gulfstream G650",
  location: "New York, NY",
  price: 15000,
  rating: 4.9,
  reviews: 124,
  passengers: 16,
  range: 7000,
  speed: 561,
  year: 2019,
  type: "Heavy Jet",
  description:
    "The Gulfstream G650 is an ultra-high-speed, ultra-long-range business jet manufactured by Gulfstream Aerospace. The G650 can accommodate up to 19 passengers and can be configured to sleep up to 10. The aircraft has a range of 7,000 nautical miles and is capable of a maximum operating speed of Mach 0.925.",
  features: [
    "Spacious cabin with stand-up headroom",
    "Fully equipped galley",
    "Private lavatory",
    "Wi-Fi and satellite communications",
    "Entertainment system",
    "Leather seating",
    "Foldable tables",
    "Cabin divider for privacy",
  ],
  owner: {
    name: "Elite Aviation Services",
    rating: 4.9,
    reviews: 87,
    image: "/placeholder.svg?height=200&width=200&query=professional pilot portrait",
  },
  images: [
    "/placeholder.svg?height=800&width=1200&query=Gulfstream G650 exterior on runway",
    "/placeholder.svg?height=800&width=1200&query=Gulfstream G650 luxury cabin interior",
    "/placeholder.svg?height=800&width=1200&query=Gulfstream G650 cockpit",
    "/placeholder.svg?height=800&width=1200&query=Gulfstream G650 bedroom area",
    "/placeholder.svg?height=800&width=1200&query=Gulfstream G650 dining area",
  ],
}

export default function AircraftDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <Link href="/host" className="text-sm font-medium hover:text-primary">
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

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/aircraft" className="text-sm text-gray-600 hover:text-primary flex items-center">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Back to all aircraft
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{aircraft.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{aircraft.rating}</span>
                <span className="text-gray-500 ml-1">({aircraft.reviews} reviews)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-1" />
                {aircraft.location}
              </div>
              <Badge variant="outline" className="font-normal">
                {aircraft.type}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="relative col-span-3 row-span-2 h-80">
                <Image
                  src={aircraft.images[0] || "/placeholder.svg"}
                  alt={`${aircraft.name} main view`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {aircraft.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative h-36">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${aircraft.name} view ${index + 2}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">About this aircraft</h2>
                  <p className="text-gray-700">{aircraft.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Passengers</h3>
                    </div>
                    <p className="text-2xl font-semibold">{aircraft.passengers}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Ruler className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Range</h3>
                    </div>
                    <p className="text-2xl font-semibold">
                      {aircraft.range} <span className="text-sm">nm</span>
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Plane className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Speed</h3>
                    </div>
                    <p className="text-2xl font-semibold">
                      {aircraft.speed} <span className="text-sm">mph</span>
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <h3 className="font-medium">Year</h3>
                    </div>
                    <p className="text-2xl font-semibold">{aircraft.year}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Hosted by {aircraft.owner.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                      src={aircraft.owner.image || "/placeholder.svg"}
                      alt={aircraft.owner.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{aircraft.owner.rating}</span>
                        <span className="text-gray-500 ml-1">({aircraft.owner.reviews} reviews)</span>
                      </div>
                      <p className="text-gray-600 mt-1">Professional operator since 2010</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features">
                <h2 className="text-xl font-semibold mb-4">Aircraft Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  {aircraft.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary text-primary-foreground text-3xl font-bold rounded-lg p-4 flex items-center justify-center min-w-[80px]">
                      {aircraft.rating}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Excellent</h3>
                      <p className="text-gray-600">{aircraft.reviews} verified reviews</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Sample reviews */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src="/placeholder.svg?height=50&width=50&query=business person portrait"
                          alt="Reviewer"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">Michael Johnson</h4>
                          <p className="text-sm text-gray-500">June 2023</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        Exceptional service and an immaculate aircraft. The crew was professional and accommodating.
                        Will definitely book again for my next business trip.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src="/placeholder.svg?height=50&width=50&query=professional woman portrait"
                          alt="Reviewer"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">Sarah Williams</h4>
                          <p className="text-sm text-gray-500">April 2023</p>
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        The G650 was perfect for our family vacation. Comfortable seating, excellent amenities, and the
                        pilot was very professional. The only minor issue was a slight delay on departure.
                      </p>
                    </div>

                    <Button variant="outline" className="w-full">
                      View all {aircraft.reviews} reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>${aircraft.price.toLocaleString()}</span>
                  <span className="text-sm font-normal text-gray-500">per hour</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm aircraft={aircraft} />

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Every booking includes insurance coverage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-5 w-5 text-primary" />
                    <span>All aircraft are certified and regularly inspected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} SkyCharter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
