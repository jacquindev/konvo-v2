import dynamic from "next/dynamic";

import { HeroSection } from "@/components/landing/hero-section";

const SocialProof = dynamic(() => import("@/components/landing/social-proof").then((component) => component.SocialProof));
const ShowCase = dynamic(() => import("@/components/landing/show-case").then((component) => component.ShowCase));
const FeaturesSection = dynamic(() => import("@/components/landing/features-section").then((component) => component.FeaturesSection));
 
const Page = () => {
  return (
    <>
      <HeroSection />
      <SocialProof />
      <ShowCase />
      <FeaturesSection />
    </>
  )
}

export default Page
