import Link from "next/link"
import Image from "next/image"
import { Star, Users, MapPin } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredAircraft = [
  {
    id: 1,
    name: "Gulfstream G650",
    location: "New York, NY",
    price: 15000,
    rating: 4.9,
    reviews: 124,
    passengers: 16,
    image: "/opulent-g650-cabin.png",
  },
  {
    id: 2,
    name: "Bombardier Global 7500",
    location: "Los Angeles, CA",
    price: 17500,
    rating: 4.8,
    reviews: 98,
    passengers: 19,
    image: "/global-executive-suite.png",
  },
  {
    id: 3,
    name: "Cessna Citation X",
    location: "Miami, FL",
    price: 8500,
    rating: 4.7,
    reviews: 156,
    passengers: 12,
    image: "/citation-x-luxury.png",
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
  },
]

export default function FeaturedAircraft() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Aircraft</h2>
            <p className="text-gray-600">Discover our most popular private jets</p>
          </div>
          <Link href="/aircraft">
            <span className="text-primary font-medium hover:underline">View all aircraft</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAircraft.map((aircraft) => (
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
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {aircraft.passengers} passengers
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t">
                  <span className="text-sm text-gray-600">Available for charter</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
