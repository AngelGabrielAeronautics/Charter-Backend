"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface BookingFormProps {
  aircraft: {
    id: number
    name: string
    price: number
  }
}

export default function BookingForm({ aircraft }: BookingFormProps) {
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("2")
  const [departureLocation, setDepartureLocation] = useState("")
  const [arrivalLocation, setArrivalLocation] = useState("")

  // Calculate estimated price
  const days =
    departureDate && returnDate
      ? Math.ceil((returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0

  // Assume 4 hours of flight time per day for estimation
  const estimatedHours = days * 4
  const estimatedPrice = aircraft.price * estimatedHours

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the booking request
    alert("Booking request submitted! We'll contact you shortly to confirm details.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="departure-location">Departure Location</Label>
        <Input
          id="departure-location"
          placeholder="e.g. New York, NY"
          value={departureLocation}
          onChange={(e) => setDepartureLocation(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="arrival-location">Arrival Location</Label>
        <Input
          id="arrival-location"
          placeholder="e.g. Miami, FL"
          value={arrivalLocation}
          onChange={(e) => setArrivalLocation(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {departureDate ? departureDate.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Return Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {returnDate ? returnDate.toLocaleDateString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                initialFocus
                disabled={(date) => !departureDate || date < departureDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="passengers">Passengers</Label>
        <Select value={passengers} onValueChange={setPassengers}>
          <SelectTrigger id="passengers">
            <SelectValue placeholder="Select number of passengers" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(16)].map((_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {i + 1} {i === 0 ? "passenger" : "passengers"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {departureDate && returnDate && (
        <>
          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Estimated flight time:</span>
              <span>{estimatedHours} hours</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Rate per hour:</span>
              <span>${aircraft.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Estimated total:</span>
              <span>${estimatedPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500">
              Final price will be calculated based on actual flight time and additional services.
            </p>
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        Request to Book
      </Button>

      <p className="text-xs text-center text-gray-500">
        You won't be charged yet. We'll contact you to confirm details and process payment.
      </p>
    </form>
  )
}
