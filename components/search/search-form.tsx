"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Calendar, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function SearchForm() {
  const router = useRouter()
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState<Date>()
  const [passengers, setPassengers] = useState(2)
  const [showMultiDestination, setShowMultiDestination] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?from=${from}&to=${to}&date=${date?.toISOString()}&passengers=${passengers}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin className="h-5 w-5" />
          </div>
          <Input
            placeholder="From"
            className="pl-10 h-12"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin className="h-5 w-5" />
          </div>
          <Input placeholder="To" className="pl-10 h-12" value={to} onChange={(e) => setTo(e.target.value)} required />
        </div>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal h-12", !date && "text-muted-foreground")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Users className="h-5 w-5" />
          </div>
          <select
            className="w-full h-12 pl-10 pr-4 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={passengers}
            onChange={(e) => setPassengers(Number.parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "passenger" : "passengers"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showMultiDestination && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MapPin className="h-5 w-5" />
            </div>
            <Input placeholder="Additional destination" className="pl-10 h-12" />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MapPin className="h-5 w-5" />
            </div>
            <Input placeholder="Next destination" className="pl-10 h-12" />
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12 text-muted-foreground"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" initialFocus disabled={(date) => date < new Date()} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500"
              onClick={() => setShowMultiDestination(false)}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-gray-500"
          onClick={() => setShowMultiDestination(true)}
          disabled={showMultiDestination}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add a destination
        </Button>

        <Button type="submit" className="bg-black text-white hover:bg-black/90">
          <Search className="h-4 w-4 mr-2" />
          Search a flight
        </Button>
      </div>
    </form>
  )
}
