"use client"

import { useQuery } from "@tanstack/react-query"

type Flight = {
  id: number
  from: string
  to: string
  date: string
  departureTime: string
  arrivalTime: string
  price: number
  aircraft: string
  category: string
  seats: number
  image: string
}

async function fetchFlights(from?: string, to?: string, date?: string, passengers?: number): Promise<Flight[]> {
  const params = new URLSearchParams()
  if (from) params.append("from", from)
  if (to) params.append("to", to)
  if (date) params.append("date", date)
  if (passengers) params.append("passengers", passengers.toString())

  const response = await fetch(`/api/flights?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch flights")
  }

  return response.json()
}

export function useFlights(from?: string, to?: string, date?: string, passengers?: number) {
  return useQuery({
    queryKey: ["flights", from, to, date, passengers],
    queryFn: () => fetchFlights(from, to, date, passengers),
    enabled: !!(from && to), // Only fetch when from and to are provided
  })
}
