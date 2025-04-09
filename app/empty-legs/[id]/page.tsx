import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from an API based on the ID
const getEmptyLeg = (id: string) => {
  return {
    id: Number.parseInt(id),
    from: "New York (KTEB)",
    to: "Miami (KOPF)",
    date: "May 15, 2023",
    departureTime: "10:00",
    arrivalTime: "12:30",
    price: 9800,
    aircraft: "Citation XLS",
    category: "Midsize Jet",
    seats: 8,
    image: "/citation-xls.png",
    description:
      "This empty leg flight is available due to a one-way charter booking. Take advantage of this opportunity to fly on a luxurious Citation XLS at a fraction of the regular price.",
    amenities: ["Wi-Fi", "Refreshments", "Leather seats", "Air conditioning", "Lavatory"],
    operator: "SkyJet Charter",
    operatorRating: 4.9,
  }
}

export default function EmptyLegDetailPage({ params }: { params: { id: string } }) {
  const emptyLeg = getEmptyLeg(params.id)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/empty-legs" className="inline-flex items-center text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to empty legs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="relative h-64 md:h-96">
                <Image
                  src={emptyLeg.image || "/placeholder.svg"}
                  alt={emptyLeg.aircraft}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{emptyLeg.aircraft}</h1>
                    <Badge variant="outline" className="font-normal">
                      {emptyLeg.category}
                    </Badge>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-500">Price per seat</p>
                    <p className="text-3xl font-bold">${emptyLeg.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{emptyLeg.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <span>
                        {emptyLeg.departureTime} - {emptyLeg.arrivalTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{emptyLeg.seats} available seats</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start">
                      <Plane className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">From: {emptyLeg.from}</p>
                        <p className="font-medium mt-2">To: {emptyLeg.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">Operated by {emptyLeg.operator}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About this flight</h2>
                  <p className="text-gray-700">{emptyLeg.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Amenities</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {emptyLeg.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Book this empty leg</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Price per seat</span>
                    <span className="font-bold">${emptyLeg.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of seats</span>
                    <select className="border rounded px-2 py-1">
                      {[...Array(emptyLeg.seats)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${emptyLeg.price}</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-black/90">Book now</Button>
                  <p className="text-xs text-gray-500 text-center">
                    By booking, you agree to our terms and conditions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Need help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our team is available 24/7 to assist you with your booking or answer any questions.
                </p>
                <Button variant="outline" className="w-full">
                  Contact us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
