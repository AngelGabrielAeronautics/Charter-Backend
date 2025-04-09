import Image from "next/image"
import SearchForm from "@/components/search/search-form"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Image src="/aerial-jet-view.png" alt="Private jet flying over ocean" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Private jet flight
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-normal">to any place all around the world</span>
          </h1>

          <div className="bg-white rounded-xl p-4 shadow-lg">
            <SearchForm />
          </div>
        </div>
      </div>
    </section>
  )
}
