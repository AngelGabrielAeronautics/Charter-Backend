import Image from "next/image"

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why choose SkyJet</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-gray-100 rounded-full p-4 h-16 w-16 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 8V4H8"></path>
                    <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                    <path d="M2 14h2"></path>
                    <path d="M20 14h2"></path>
                    <path d="M15 13v2"></path>
                    <path d="M9 13v2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant booking</h3>
                  <p className="text-gray-600">
                    Book your private jet in minutes with our streamlined booking process.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gray-100 rounded-full p-4 h-16 w-16 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                    <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
                    <path d="M5 18v2"></path>
                    <path d="M19 18v2"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent pricing</h3>
                  <p className="text-gray-600">No hidden fees or surprises. Get clear pricing before you book.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-gray-100 rounded-full p-4 h-16 w-16 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Safety first</h3>
                  <p className="text-gray-600">
                    All aircraft and operators meet the highest safety standards in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <Image src="/luxury-jet-interior.png" alt="Luxury jet interior" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
