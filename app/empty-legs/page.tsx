import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// This would typically come from an API
const emptyLegs = [
  {
    id: 1,
    from: "New York (KTEB)",
    to: "Miami (KOPF)",
    date: "May 15, 2023",
    price: 9800,
    aircraft: "Citation XLS",
    seats: 8,
    image: "/citation-xls.png",
  },
  {
    id: 2,
    from: "London (EGLF)",
    to: "Paris (LFPB)",
    date: "May 18, 2023",
    price: 4500,
    aircraft: "Phenom 300",
    seats: 6,
    image: "/phenom-300.png",
  },
  {
    id: 3,
    from: "Los Angeles (KVNY)",
    to: "Las Vegas (KLAS)",
    date: "May 20, 2023",
    price: 3200,
    aircraft: "Citation CJ3",
    seats: 7,
    image: "/citation-cj3.png",
  },
  {
    id: 4,
    from: "Dubai (OMDW)",
    to: "Riyadh (OERK)",
    date: "May 22, 2023",
    price: 8500,
    aircraft: "Challenger 350",
    seats: 9,
    image: "/challenger-350.png",
  },
  {
    id: 5,
    from: "Singapore (WSSL)",
    to: "Bangkok (VTBD)",
    date: "May 25, 2023",
    price: 7200,
    aircraft: "Legacy 500",
    seats: 12,
    image: "/legacy-500.png",
  },
  {
    id: 6,
    from: "Geneva (LSGG)",
    to: "Nice (LFMN)",
    date: "May 27, 2023",
    price: 3800,
    aircraft: "Citation Mustang",
    seats: 4,
    image: "/citation-mustang.png",
  },
  {
    id: 7,
    from: "Toronto (CYYZ)",
    to: "Montreal (CYUL)",
    date: "May 29, 2023",
    price: 2900,
    aircraft: "Pilatus PC-12",
    seats: 8,
    image: "/pilatus-pc12.png",
  },
  {
    id: 8,
    from: "Sydney (YSSY)",
    to: "Melbourne (YMML)",
    date: "June 1, 2023",
    price: 5600,
    aircraft: "Hawker 900XP",
    seats: 8,
    image: "/hawker-900xp.png",
  },
]

export default function EmptyLegsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Empty legs</h1>
            <p className="text-gray-600">Save up to 75% on one-way private flights</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Input placeholder="Search by location" className="w-64" />
            </div>
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {emptyLegs.map((leg) => (
            <Link href={`/empty-legs/${leg.id}`} key={leg.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <Image src={leg.image || "/placeholder.svg"} alt={leg.aircraft} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-normal">
                      {leg.date}
                    </Badge>
                    <span className="font-bold text-lg">${leg.price}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <p className="font-medium">{leg.from}</p>
                        <p className="text-gray-500">{leg.aircraft}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="text-sm text-right">
                        <p className="font-medium">{leg.to}</p>
                        <p className="text-gray-500">{leg.seats} seats</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
