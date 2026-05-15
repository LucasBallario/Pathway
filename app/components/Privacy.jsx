"use client"

import { motion } from "motion/react"
import { GlobeLock, ShieldOff, BookCheck, BadgeX } from "lucide-react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewReveal,
} from "@/lib/motion-presets"

export default function Privacy() {
  const features = [
    {
      icon: GlobeLock,
      title: "Your Privacy Matters to Us",
      description: "We prioritize your security and implement industry-leading protections",
    },
    {
      icon: ShieldOff,
      title: "We Don't Store Your Data",
      description: "No personal information is saved on our servers",
    },
    {
      icon: BookCheck,
      title: "Only Public Sources",
      description: "We use exclusively public, verified data sources",
    },
    {
      icon: BadgeX,
      title: "Delete Anytime",
      description: "Remove your information with a single click",
    },
  ]

  return (
    <section className="mt-16 bg-midnight-void px-4 py-16 sm:px-6 md:mt-[64px] lg:px-8">
      <motion.div
        className="mx-auto mb-16 max-w-4xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewReveal}
        variants={fadeInUp}
      >
        <h2 className="mb-4 text-balance text-[2.125rem] font-bold leading-[1.03] text-polar-white sm:text-[2.75rem]">
          Your Privacy Matters to Us
        </h2>
        <p className="text-lg font-normal leading-[1.28] text-ash-gray">
          We are committed to protecting your data with transparent, secure practices
        </p>
      </motion.div>

      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewReveal}
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="relative overflow-hidden rounded-lg border border-dark-carbon bg-deep-space p-8 transition-colors duration-300 hover:border-slate"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <motion.div
                  className="inline-flex w-fit rounded-lg border border-dark-carbon bg-midnight-void p-3 text-polar-white"
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-xl font-bold leading-tight text-polar-white">{feature.title}</h3>

                <p className="text-sm font-normal leading-relaxed text-ash-gray">{feature.description}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
