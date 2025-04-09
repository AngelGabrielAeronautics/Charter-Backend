import Link from "next/link"
import Image from "next/image"
import { Star, Users, MapPin, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const aircraftList = [
  {
    id: 1,
    name: "Gulfstream G650",
    location: "New York, NY",
    price: 15000,
    rating: 4.9,
    reviews: 124,
    passengers: 16,
    image: "/placeholder.svg?height=600&width=800&query=Gulfstream G650 interior luxury private jet",
    type: "Heavy Jet",
    range: 7000,
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    location: "Los Angeles, CA",
    price: 17500,
    rating: 4.8,
    reviews: 98,
    passengers: 19,
    image: "/placeholder.svg?height=600&width=800&query=Bombardier Global 7500 interior luxury private jet",
    type: "Heavy Jet",
    range: 7700,
  },
  {
    id: 3,
    name: "Cessna Citation X",
    location: "Miami, FL",
    price: 8500,
    rating: 4.7,
    reviews: 156,
    passengers: 12,
    image: "/placeholder.svg?height=600&width=800&query=Cessna Citation X interior luxury private jet",
    type: "Super Midsize Jet",
    range: 3460,
  },
  {
    id: 4,
    name: "Embraer Phenom 300",
    location: "Chicago, IL",
    price: 6000,
    rating: 4.9,
    reviews: 87,
    passengers: 8,
    image: "/placeholder.svg?height=600&width=800&query=Embraer Phenom 300 interior luxury private jet",
    type: "Light Jet",
    range: 1971,
  },
  {
    id: 5,
    name: "Dassault Falcon 8X",
    location: "Dallas, TX",
    price: 14000,
    rating: 4.8,
    reviews: 76,
    passengers: 14,
    image: "/placeholder.svg?height=600&width=800&query=Dassault Falcon 8X interior luxury private jet",
    type: "Heavy Jet",
    range: 6450,
  },
  {
    id: 6,
    name: "Pilatus PC-12",
    location: "Denver, CO",
    price: 3500,
    rating: 4.6,
    reviews: 112,
    passengers: 9,
    image: "/placeholder.svg?height=600&width=800&query=Pilatus PC-12 interior luxury private aircraft",
    type: "Turboprop",
    range: 1800,
  },
  {
    id: 7,
    name: "Beechcraft King Air 350i",
    location: "Seattle, WA",
    price: 3200,
    rating: 4.7,
    reviews: 94,
    passengers: 11,
    image: "/placeholder.svg?height=600&width=800&query=Beechcraft King Air 350i interior luxury private aircraft",
    type: "Turboprop",
    range: 1806,
  },
  {
    id: 8,
    name: "Learjet 75",
    location: "Las Vegas, NV",
    price: 5500,
    rating: 4.8,
    reviews: 68,
    passengers: 9,
    image: "/placeholder.svg?height=600&width=800&query=Learjet 75 interior luxury private jet",
    type: "Light Jet",
    range: 2040,
  },
]

export default function AircraftListingPage() {
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
            <Link href="/aircraft" className="text-sm font-medium text-primary">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Available Aircraft</h1>
            <p className="text-gray-600">Find and book the perfect private aircraft for your journey</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="passengers">Passenger Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {aircraftList.map((aircraft) => (
            <Link href={`/aircraft/${aircraft.id}`} key={aircraft.id}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={aircraft.image || "/placeholder.svg"} alt={aircraft.name} fill className="object-cover" />
                  <Badge className="absolute top-3 right-3 bg-white/80 text-black hover:bg-white/80">
                    ${aircraft.price.toLocaleString()}/hr
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{aircraft.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{aircraft.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({aircraft.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {aircraft.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    {aircraft.passengers} passengers
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{aircraft.type}</span> • {aircraft.range} nm range
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t">
                  <span className="text-sm text-gray-600">Available for charter</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} SkyCharter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
