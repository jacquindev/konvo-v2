import dynamic from "next/dynamic"

const HeroSection = dynamic(() => import("@/components/landing/hero-section").then((component) => component.HeroSection));
const ShowCase = dynamic(() => import("@/components/landing/show-case").then((component) => component.ShowCase));
const SocialProof = dynamic(() => import("@/components/landing/social-proof").then((component) => component.SocialProof));
const FeaturesSection = dynamic(() => import("@/components/landing/features-section").then((component) => component.FeaturesSection));


const Page = () => {
  return (
    <>
      <HeroSection />
      <ShowCase />
      <SocialProof />
      <FeaturesSection />
    </>
  )
}

export default Page
