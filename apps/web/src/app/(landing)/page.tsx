import dynamic from "next/dynamic";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";

const SocialProof = dynamic(() => import("@/components/landing/social-proof").then((component) => component.SocialProof));
const ShowCase = dynamic(() => import("@/components/landing/show-case").then((component) => component.ShowCase));

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
