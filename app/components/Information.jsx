"use client"

import { motion } from "motion/react"
import { Shield, Database, AlertCircle } from "lucide-react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewReveal,
} from "@/lib/motion-presets"

export default function Information() {
  const benefits = [
    {
      icon: AlertCircle,
      title: "Data Exposure Risk",
      description: "+80% of people have personal data exposed without knowing it",
    },
    {
      icon: Database,
      title: "Unauthorized Databases",
      description: "Your email may be in public databases without your consent",
    },
    {
      icon: Shield,
      title: "Security Threats",
      description: "Leaked passwords, old profiles, indexed posts can be used by attackers",
    },
  ]

  return (
    <section className="mt-16 w-full bg-midnight-void px-4 py-16 sm:px-6 md:mt-[64px] lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
          variants={fadeInUp}
        >
          <h2 className="mb-3 text-[2.125rem] font-bold leading-[1.07] text-polar-white sm:text-[2.75rem]">
            Why use Pathway?
          </h2>
          <p className="text-lg font-normal leading-[1.28] text-polar-white">
            Protect your personal information from threats and unauthorized exposure
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="rounded-lg border border-dark-carbon bg-deep-space p-6 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-polar-white">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-[23px] font-bold leading-[1.11] text-polar-white">{benefit.title}</h3>
                    <p className="text-base font-normal leading-relaxed text-ash-gray">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
