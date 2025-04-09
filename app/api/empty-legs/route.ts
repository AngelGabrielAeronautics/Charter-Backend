import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const date = searchParams.get("date")

    // Build query
    const query: any = {
      status: "active",
    }

    if (from) {
      query.from = { contains: from, mode: "insensitive" }
    }

    if (to) {
      query.to = { contains: to, mode: "insensitive" }
    }

    if (date) {
      const searchDate = new Date(date)
      query.OR = [
        {
          date: {
            gte: new Date(searchDate.setHours(0, 0, 0, 0)),
            lt: new Date(searchDate.setHours(23, 59, 59, 999)),
          },
        },
        { dateFlexible: true },
      ]
    }

    // Fetch data from database using Prisma
    const deadLegs = await prisma.deadLeg.findMany({
      where: query,
      include: {
        aircraft: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    // Transform data for the frontend
    const formattedDeadLegs = deadLegs.map((leg) => ({
      id: leg.id,
      from: leg.from,
      to: leg.to,
      date: leg.date.toISOString(),
      price: leg.pricePerSeat,
      aircraft: leg.aircraft.model,
      seats: leg.maxSeatsAvailable,
      image: leg.aircraft.images[0] || `/placeholder.svg?height=600&width=800&query=${leg.aircraft.model} private jet`,
    }))

    return NextResponse.json(formattedDeadLegs)
  } catch (error) {
    console.error("Error fetching empty legs:", error)
    return NextResponse.json({ error: "Failed to fetch empty legs" }, { status: 500 })
  }
}
