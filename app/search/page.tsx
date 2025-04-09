"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SearchForm from "@/components/search/search-form"
import { useFlights } from "@/hooks/use-flights"
import { useSearchParams } from "next/navigation"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "New York"
  const to = searchParams.get("to") || "Miami"
  const date = searchParams.get("date") || new Date().toISOString()
  const passengers = searchParams.get("passengers") || "2"

  const { data: flights, isLoading, error } = useFlights(from as string, to as string, date, Number(passengers))

  // Fallback data for development
  const searchResults = flights || [
    {
      id: 1,
      from: "New York (KTEB)",
      to: "Miami (KOPF)",
      date: "May 15, 2023",
      departureTime: "10:00",
      arrivalTime: "12:30",
      price: 15800,
      aircraft: "Gulfstream G650",
      category: "Heavy Jet",
      seats: 16,
      image: "/g650-result.png",
    },
    // ... other fallback data
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <SearchForm />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {from} to {to}
            </h1>
            <p className="text-gray-600">
              {date ? new Date(date).toLocaleDateString() : "May 15, 2023"} • {passengers}{" "}
              {Number.parseInt(passengers as string) === 1 ? "passenger" : "passengers"}
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort by: Price
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading flights...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Error loading flights. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                  <div className="relative h-48 md:h-full md:col-span-1">
                    <Image
                      src={result.image || "/placeholder.svg"}
                      alt={result.aircraft}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:col-span-2 lg:col-span-3">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">{result.aircraft}</h3>
                          <Badge variant="outline" className="font-normal">
                            {result.category}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{result.departureTime}</p>
                            <p className="text-sm text-gray-500">{result.from}</p>
                          </div>
                          <div className="flex-1 px-4">
                            <div className="relative">
                              <div className="absolute left-0 right-0 top-1/2 border-t border-gray-300"></div>
                              <div className="flex justify-center">
                                <ArrowRight className="relative z-10 bg-white h-5 w-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{result.arrivalTime}</p>
                            <p className="text-sm text-gray-500">{result.to}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <p>
                            {typeof result.date === "string" ? result.date : new Date(result.date).toLocaleDateString()}
                          </p>
                          <span className="mx-2">•</span>
                          <p>{result.seats} seats</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 flex flex-col justify-between md:col-span-1">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">starting from</p>
                      <p className="text-2xl font-bold">${result.price.toLocaleString()}</p>
                    </div>
                    <Link href={`/booking/${result.id}`}>
                      <Button className="w-full mt-4 bg-black text-white hover:bg-black/90">Book now</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
