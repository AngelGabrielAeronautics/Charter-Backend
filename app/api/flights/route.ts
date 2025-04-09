import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const date = searchParams.get("date")
    const passengers = searchParams.get("passengers")

    // In a real application, we would query available aircraft based on the route
    // For now, we'll return mock data that's structured like it came from Prisma

    // This would be a real Prisma query in production
    // const availableAircraft = await prisma.aircraft.findMany({
    //   where: {
    //     seats: { gte: parseInt(passengers || '1') },
    //   },
    //   take: 4,
    // })

    // Mock data for development
    const mockFlights = [
      {
        id: "1",
        from: from || "New York (KTEB)",
        to: to || "Miami (KOPF)",
        date: date ? new Date(date) : new Date("2023-05-15"),
        departureTime: "10:00",
        arrivalTime: "12:30",
        price: 15800,
        aircraft: "Gulfstream G650",
        category: "Heavy Jet",
        seats: 16,
        image: "/g650-result.png",
      },
      {
        id: "2",
        from: from || "New York (KTEB)",
        to: to || "Miami (KOPF)",
        date: date ? new Date(date) : new Date("2023-05-15"),
        departureTime: "12:00",
        arrivalTime: "14:30",
        price: 12500,
        aircraft: "Challenger 350",
        category: "Super Midsize Jet",
        seats: 9,
        image: "/challenger-350-result.png",
      },
      {
        id: "3",
        from: from || "New York (KTEB)",
        to: to || "Miami (KOPF)",
        date: date ? new Date(date) : new Date("2023-05-15"),
        departureTime: "14:00",
        arrivalTime: "16:30",
        price: 9800,
        aircraft: "Citation XLS",
        category: "Midsize Jet",
        seats: 8,
        image: "/citation-xls-result.png",
      },
      {
        id: "4",
        from: from || "New York (KTEB)",
        to: to || "Miami (KOPF)",
        date: date ? new Date(date) : new Date("2023-05-15"),
        departureTime: "16:00",
        arrivalTime: "18:30",
        price: 7500,
        aircraft: "Phenom 300",
        category: "Light Jet",
        seats: 6,
        image: "/phenom-300-result.png",
      },
    ]

    return NextResponse.json(mockFlights)
  } catch (error) {
    console.error("Error fetching flights:", error)
    return NextResponse.json({ error: "Failed to fetch flights" }, { status: 500 })
  }
}
