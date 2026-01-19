"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  BarChartIcon,
  BookOpenIcon,
  CodeIcon,
  MessageCircleHeartIcon,
  PaletteIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { useIsMobile } from "@repo/ui/hooks/use-mobile";

import { TypingAnimation } from "@repo/ui/components/shared/typing-animation";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/ui/carousel";

type FeatureCardProps = {
  feature: {
    title: string;
    description: string;
    icon: React.ElementType;
  };
  delay: number;
};

const FeatureCard = ({ feature, delay }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Card className="relative h-full overflow-hidden rounded-2xl border-none bg-linear-to-b from-indigo-500/60 via-indigo-950/50 to-[#0a0a0e] p-2 shadow-sm backdrop-blur-lg hover:scale-105 hover:from-indigo-500/50 hover:shadow-md motion-safe:transition-all motion-safe:duration-300">
        <CardContent className="space-y-4 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-[#0a0a0e]">
                <feature.icon className="size-6 text-gray-300" />
              </div>
              <CardTitle className="text-lg font-semibold text-white">
                {feature.title}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed text-gray-400">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const features = [
  {
    title: "Knowledge Graph",
    icon: BookOpenIcon,
    description:
      "We automatically crawl your site and documents to build a structured understanding of your product — no manual training needed.",
  },
  {
    title: "Strict Guardrails",
    icon: ShieldCheckIcon,
    description:
      "Set clear boundaries for what the AI can and cannot say. Out-of-scope questions are handled safely and politely.",
  },
  {
    title: "Tone Matching",
    icon: MessageCircleHeartIcon,
    description:
      "From professional to playful, the AI adapts seamlessly to your brand’s unique voice.",
  },
  {
    title: "Embed Anywhere",
    icon: CodeIcon,
    description:
      "Drop the chatbot into any website or app with a simple, flexible embed.",
  },
  {
    title: "Custom Styling",
    icon: PaletteIcon,
    description:
      "Fully customize the look and feel so your chatbot fits perfectly with your brand.",
  },
  {
    title: "Analytics Dashboard",
    icon: BarChartIcon,
    description:
      "Monitor conversations, usage trends, and customer feedback in one clear dashboard.",
  },
];

export function FeaturesSection() {
  const isMobile = useIsMobile();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section
      id="features"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-32 md:px-8 lg:px-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mb-4 text-center text-4xl font-medium tracking-tight text-white md:text-left md:text-5xl">
          <TypingAnimation words={["Designed for trust."]} loop />
        </div>
        <motion.p
          initial={{ opacity: 0, transform: "translateY(-100px)" }}
          animate={{ opacity: 0.5, transform: "translateY(0)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="max-w-2xl text-center leading-snug font-light text-balance text-zinc-400 md:text-left md:text-pretty"
        >
          From real-time chat to custom styling and full API access, Konvo helps
          you build truly smart and flexible support systems based on your own
          content, with a personality you control.
        </motion.p>

        {isMobile ? (
          <Carousel
            plugins={[plugin.current]}
            className="mx-auto w-full max-w-sm items-center justify-center pt-16"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index}>
                  <FeatureCard feature={feature} delay={index * 0.1} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 gap-8 pt-16 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard feature={feature} key={index} delay={index * 0.1} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
