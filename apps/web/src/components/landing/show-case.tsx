"use client";

import { motion } from "motion/react";

import { ChatbotPanel } from "./chatbot-panel";

const showCaseItems = [
  {
    title: "Conversational Onboarding",
    description: "Guide new users through setup and features with a personalized chatbot experience."
  },
  {
    title: "Smart Support Routing",
    description: "Automatically resolve common questions or escalate to human when needed."
  },
  {
    title: "CRM & Email Integration",
    description: "Connect seamlessly with your existing tools to sync contacts and run campaigns."
  }
]

export function ShowCase() {
  return (
    <section className="px-6 lg:px-16 py-24">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-8 rounded-2xl border-2 border-white/5 bg-[#05050e]/60 backdrop-blur-xl shadow-lg overflow-hidden">
        {/* Gradient background */}
        <div className="pointer-events-auto absolute inset-0 z-0 bg-linear-to-br from-indigo-500/30 from-5% via-[#05050e]/30 via-30% to-indigo-500/50" />

        <div className="space-y-10 p-10">
          <h2 className="text-4xl font-semibold text-white">Experience conversational support that converts</h2>
          <p className="text-base text-balance text-zinc-300">
            Meet your AI assistant. Automate onboarding, assist customers in real-time, and grow your business - all through a customizable chat experience.
          </p>

          <div className="space-y-6">
            {showCaseItems.map((item, index) => (
              <motion.li 
                key={index} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" }}
                }}
                className="flex items-start gap-3"
              >
                <div className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="text-base font-medium text-zinc-200">{item.title}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </div>
        </div>
        <div className="flex items-start lg:items-end">
          <div className="max-w-3xl mx-auto w-full">
            <ChatbotPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
