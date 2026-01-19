import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@repo/ui/lib/utils";

const socialLogos = [
  { src: "https://html.tailus.io/blocks/customers/nvidia.svg", alt: "Nvidia Logo", className: "h-5" },
  { src: "https://html.tailus.io/blocks/customers/column.svg", alt: "Column Logo", className: "h-4" },
  { src: "https://html.tailus.io/blocks/customers/github.svg", alt: "GitHub Logo", className: "h-4" },
  { src: "https://html.tailus.io/blocks/customers/nike.svg", alt: "Nike Logo", className: "h-5" },
  { src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg", alt: "Lemon Squeezy Logo", className: "h-5" },
  { src: "https://html.tailus.io/blocks/customers/laravel.svg", alt: "Laravel Logo", className: "h-4" },
  { src: "https://html.tailus.io/blocks/customers/lilly.svg", alt: "Lilly Logo", className: "h-7" },
  { src: "https://html.tailus.io/blocks/customers/openai.svg", alt: "OpenAI Logo", className: "h-6" },
]

export function SocialProof() {
  return (
    <section className="px-8 lg:px-10 py-12">
      <div className="group relative max-w-5xl mx-auto px-6">
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 motion-safe:duration-500 motion-safe:transition-all">
          <Link href="/" className="block text-sm text-zinc-300 duration-150 hover:opacity-75 transition-opacity">
            <span>Meet Our Customers</span>
            <ChevronRightIcon className="size-3 shrink-0 ml-1 inline-block" />
          </Link>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-x-12 gap-y-8 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14 motion-safe:transition-all motion-safe:duration-500">
          {socialLogos.map((social) => (
            <div key={social.alt} className="flex">
              <Image 
                src={social.src}
                alt={social.alt}
                width={20}
                height={20}
                className={cn("mx-auto w-fit dark:invert", social.className)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
