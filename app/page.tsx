import EmptyLegsList from "@/components/empty-legs/empty-legs-list"
import FeatureSection from "@/components/home/feature-section"
import HeroSection from "@/components/home/hero-section"
import AppDownloadSection from "@/components/home/app-download-section"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EmptyLegsList />
      <FeatureSection />
      <AppDownloadSection />
    </div>
  )
}
