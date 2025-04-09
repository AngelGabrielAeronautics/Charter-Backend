import { Search, Calendar, CreditCard } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Search",
      description: "Find the perfect aircraft for your journey by searching our extensive fleet.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Book",
      description: "Select your dates and book instantly with our secure booking system.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Pay",
      description: "Secure payment options with transparent pricing and no hidden fees.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SkyCharter makes booking private aircraft simple and transparent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
