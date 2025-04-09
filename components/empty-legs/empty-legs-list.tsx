import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
]

export default function EmptyLegsList() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Empty legs</h2>
            <p className="text-gray-600">Save up to 75% on one-way private flights</p>
          </div>
          <Link href="/empty-legs">
            <Button variant="ghost" className="text-black hover:bg-gray-100">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
    </section>
  )
}
