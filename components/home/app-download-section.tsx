import Link from "next/link"
import Image from "next/image"

export default function AppDownloadSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Download our app</h2>
        <div className="flex justify-center gap-4">
          <Link href="#" className="inline-block">
            <Image
              src="/app-store-badge.png"
              alt="Download on the App Store"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <Link href="#" className="inline-block">
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
