"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type Booking = {
  id: string
  bookingNumber: string
  clientId: string
  from: string
  to: string
  date: string
  passengers: number
  totalPrice: number
  status: string
}

type CreateBookingData = {
  quoteId: string
  specialRequests?: string
  passengerDetails: Array<{
    firstName: string
    lastName: string
    email?: string
    phone?: string
    dateOfBirth?: string
    nationality?: string
    passportNumber?: string
    passportExpiry?: string
  }>
}

export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await fetch("/api/bookings")
      if (!response.ok) {
        throw new Error("Failed to fetch bookings")
      }
      return response.json() as Promise<Booking[]>
    },
  })
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const response = await fetch(`/api/bookings?id=${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch booking")
      }
      return response.json()
    },
    enabled: !!id,
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateBookingData) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create booking")
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}
