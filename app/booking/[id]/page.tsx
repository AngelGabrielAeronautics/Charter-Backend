"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This would typically come from an API based on the ID
const getFlight = (id: string) => {
  return {
    id: Number.parseInt(id),
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
  }
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const flight = getFlight(params.id)
  const [step, setStep] = useState(1)
  const [passengers, setPassengers] = useState(1)
  const [totalPrice, setTotalPrice] = useState(flight.price)

  const handlePassengersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number.parseInt(e.target.value)
    setPassengers(value)
    setTotalPrice(flight.price * value)
  }

  const handleNextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/search" className="inline-flex items-center text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to search results
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-8">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Booking</h1>
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                      } mr-2`}
                    >
                      1
                    </div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 2 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                      } mr-2`}
                    >
                      2
                    </div>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 3 ? "bg-black text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      3
                    </div>
                  </div>
                </div>
              </div>

              {step === 1 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Flight Details</h2>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold">{flight.aircraft}</h3>
                      <Badge variant="outline" className="font-normal mt-1">
                        {flight.category}
                      </Badge>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-xl font-bold">${flight.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{flight.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span>
                          {flight.departureTime} - {flight.arrivalTime}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Up to {flight.seats} passengers</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start">
                        <Plane className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">From: {flight.from}</p>
                          <p className="font-medium mt-2">To: {flight.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <Label htmlFor="passengers" className="block mb-2">
                      Number of passengers
                    </Label>
                    <select
                      id="passengers"
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={passengers}
                      onChange={handlePassengersChange}
                    >
                      {[...Array(flight.seats)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "passenger" : "passengers"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-8">
                    <Label htmlFor="special-requests" className="block mb-2">
                      Special requests (optional)
                    </Label>
                    <textarea
                      id="special-requests"
                      className="w-full border border-gray-300 rounded-md p-2 h-32"
                      placeholder="Any special requirements or requests for your flight..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-black text-white hover:bg-black/90" onClick={handleNextStep}>
                    Continue to Passenger Details
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Passenger Details</h2>

                  {[...Array(passengers)].map((_, i) => (
                    <div key={i} className="mb-8 pb-8 border-b last:border-b-0">
                      <h3 className="font-bold mb-4">Passenger {i + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`first-name-${i}`} className="block mb-2">
                            First Name
                          </Label>
                          <Input id={`first-name-${i}`} placeholder="Enter first name" required />
                        </div>
                        <div>
                          <Label htmlFor={`last-name-${i}`} className="block mb-2">
                            Last Name
                          </Label>
                          <Input id={`last-name-${i}`} placeholder="Enter last name" required />
                        </div>
                        <div>
                          <Label htmlFor={`email-${i}`} className="block mb-2">
                            Email
                          </Label>
                          <Input id={`email-${i}`} type="email" placeholder="Enter email" required />
                        </div>
                        <div>
                          <Label htmlFor={`phone-${i}`} className="block mb-2">
                            Phone
                          </Label>
                          <Input id={`phone-${i}`} placeholder="Enter phone number" required />
                        </div>
                        <div>
                          <Label htmlFor={`dob-${i}`} className="block mb-2">
                            Date of Birth
                          </Label>
                          <Input id={`dob-${i}`} type="date" required />
                        </div>
                        <div>
                          <Label htmlFor={`nationality-${i}`} className="block mb-2">
                            Nationality
                          </Label>
                          <Input id={`nationality-${i}`} placeholder="Enter nationality" required />
                        </div>
                        <div>
                          <Label htmlFor={`passport-${i}`} className="block mb-2">
                            Passport Number
                          </Label>
                          <Input id={`passport-${i}`} placeholder="Enter passport number" required />
                        </div>
                        <div>
                          <Label htmlFor={`passport-expiry-${i}`} className="block mb-2">
                            Passport Expiry Date
                          </Label>
                          <Input id={`passport-expiry-${i}`} type="date" required />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button className="bg-black text-white hover:bg-black/90" onClick={handleNextStep}>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment</h2>

                  <Tabs defaultValue="bank-transfer" className="w-full mb-8">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
                      <TabsTrigger value="invoice">Invoice</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bank-transfer" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="font-bold mb-2">Bank Transfer Instructions</h3>
                          <p className="text-gray-600 mb-4">
                            Please transfer the total amount to the following bank account. Your booking will be
                            confirmed once the payment is received and verified.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Bank Name</p>
                              <p className="font-medium">SkyJet International Bank</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Account Holder</p>
                              <p className="font-medium">SkyJet Aviation Ltd</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">IBAN</p>
                              <p className="font-medium">SK98 7654 3210 9876 5432 1098</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">SWIFT/BIC</p>
                              <p className="font-medium">SKYJETUS</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Reference</p>
                              <p className="font-medium">BK-{params.id}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="transfer-reference" className="block mb-2">
                            Bank Transfer Reference Number
                          </Label>
                          <Input
                            id="transfer-reference"
                            placeholder="Enter your bank transfer reference"
                            className="mb-2"
                          />
                          <p className="text-xs text-gray-500">
                            If you have already made the transfer, please enter the reference number here.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="transfer-date" className="block mb-2">
                            Transfer Date
                          </Label>
                          <Input id="transfer-date" type="date" className="mb-2" />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="invoice" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border">
                          <h3 className="font-bold mb-2">Invoice Request</h3>
                          <p className="text-gray-600">
                            We will send an invoice to your email address. Payment must be received within 48 hours to
                            confirm your booking.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="billing-email" className="block mb-2">
                            Billing Email
                          </Label>
                          <Input id="billing-email" type="email" placeholder="Enter billing email" className="mb-2" />
                        </div>
                        <div>
                          <Label htmlFor="company-name" className="block mb-2">
                            Company Name (if applicable)
                          </Label>
                          <Input id="company-name" placeholder="Enter company name" className="mb-2" />
                        </div>
                        <div>
                          <Label htmlFor="vat-number" className="block mb-2">
                            VAT Number (if applicable)
                          </Label>
                          <Input id="vat-number" placeholder="Enter VAT number" className="mb-2" />
                        </div>
                        <div>
                          <Label htmlFor="billing-address" className="block mb-2">
                            Billing Address
                          </Label>
                          <textarea
                            id="billing-address"
                            className="w-full border border-gray-300 rounded-md p-2 h-24"
                            placeholder="Enter billing address"
                          ></textarea>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Back
                    </Button>
                    <Button className="bg-black text-white hover:bg-black/90">Complete Booking</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{flight.aircraft}</h3>
                      <p className="text-sm text-gray-500">
                        {flight.from} to {flight.to}
                      </p>
                    </div>
                    <div className="relative h-16 w-16">
                      <Image
                        src={flight.image || "/placeholder.svg"}
                        alt={flight.aircraft}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Date</span>
                      <span>{flight.date}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Time</span>
                      <span>
                        {flight.departureTime} - {flight.arrivalTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Passengers</span>
                      <span>{passengers}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span>Base price</span>
                      <span>${flight.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Passengers</span>
                      <span>x {passengers}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t text-sm text-gray-500">
                    <p>
                      By completing this booking, you agree to our{" "}
                      <Link href="/terms" className="text-black underline">
                        terms and conditions
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
