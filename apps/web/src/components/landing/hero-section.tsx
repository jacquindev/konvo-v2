"use client"

import Link from "next/link";
import { ArrowRightIcon, BinocularsIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@repo/ui/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-dvh w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-1 flex-col items-center justify-center py-32">
        <motion.div 
          initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-flex animate-in fade-in duration-500 delay-300 items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1"
        >
          <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" />
          <span className="text-xs font-light tracking-wide text-zinc-300">Version 1.0.0 available now</span>
        </motion.div>

        <div className="p-8 lg:p-10 lg:py-12 w-full text-center text-balance relative">
          <h1 className="text-4xl leading-[1.1] font-semibold text-white tracking-tight md:text-6xl lg:text-7xl">
            {"AI Chatbot That Actually Understands Your Customers"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.2, ease: "easeInOut" }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))
            }
            
          </h1>
         
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6, ease: "easeInOut" }}
            className="p-6 text-base lg:text-lg leading-snug text-zinc-400 max-w-2xl mx-auto"
          >
            Instantly resolve customer questions with an assistant that reads your docs and speaks with empathy. No robotic replies, just answers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8, ease: "easeInOut", type: "spring", stiffness: 120, damping: 16 }}
            className="p-2 flex flex-col-reverse items-center justify-center sm:flex-row gap-4"
          >
            <Button type="button" size="lg" variant="secondary" className="rounded-full lg:px-8! shadow-xs hover:shadow-sm hover:-translate-y-0.5 motion-safe:duration-300 motion-safe:transition-all">
              View Demo <BinocularsIcon /> 
            </Button>
            <Button type="button" size="lg" asChild className="rounded-full lg:px-8! shadow-xs hover:shadow-sm hover:-translate-y-0.5 motion-safe:duration-300 motion-safe:transition-all">
              <Link href="/sign-in">
                Get Started Free <ArrowRightIcon />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute inset-x-0 -bottom-1 h-px w-full"
          >
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto h-px w-60 origin-center lg:w-80 bg-linear-to-r from-transparent via-indigo-500 to-transparent" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
