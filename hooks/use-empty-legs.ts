"use client"

import { useQuery } from "@tanstack/react-query"

type EmptyLeg = {
  id: number
  from: string
  to: string
  date: string
  price: number
  aircraft: string
  seats: number
  image: string
}

async function fetchEmptyLegs(from?: string, to?: string, date?: string): Promise<EmptyLeg[]> {
  const params = new URLSearchParams()
  if (from) params.append("from", from)
  if (to) params.append("to", to)
  if (date) params.append("date", date)

  const response = await fetch(`/api/empty-legs?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch empty legs")
  }

  return response.json()
}

export function useEmptyLegs(from?: string, to?: string, date?: string) {
  return useQuery({
    queryKey: ["emptyLegs", from, to, date],
    queryFn: () => fetchEmptyLegs(from, to, date),
  })
}

export function useEmptyLeg(id: string) {
  return useQuery({
    queryKey: ["emptyLeg", id],
    queryFn: async () => {
      const response = await fetch(`/api/empty-legs/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch empty leg")
      }
      return response.json()
    },
  })
}
