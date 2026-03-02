import { HeroSection } from '../components/sections/HeroSection'
import { FeatureStrip } from '../components/sections/FeatureStrip'
import { CategoryGrid } from '../components/sections/CategoryGrid'
import { PromoGrid } from '../components/sections/PromoGrid'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureStrip />
      <CategoryGrid />
      <PromoGrid />
    </>
  )
}
