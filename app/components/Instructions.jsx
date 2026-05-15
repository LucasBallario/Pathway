"use client"

import { motion } from "motion/react"
import { Upload, Search, FileCheck } from "lucide-react"
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  viewReveal,
} from "@/lib/motion-presets"

const steps = [
  {
    number: "01",
    title: "Upload",
    description: "You upload your information as detailed as possible",
    icon: Upload,
  },
  {
    number: "02",
    title: "Scan",
    description: "Our powerful engine searches all over the internet to find dangerous leaked information about you",
    icon: Search,
  },
  {
    number: "03",
    title: "Report",
    description: "We give you a detailed diagnostic of your situation and what you can do to fix it",
    icon: FileCheck,
  },
]

export default function Instructions() {
  return (
    <section className="w-full bg-deep-space px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
          variants={fadeInUp}
        >
          <p className="mb-4 text-[13px] font-normal uppercase tracking-[0.18em] text-ash-gray">
            How it works
          </p>
          <h2 className="text-balance text-[2.125rem] font-bold leading-[1.07] tracking-tight text-polar-white md:text-[2.75rem]">
            Security at every step
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg font-normal leading-[1.28] text-ash-gray">
            Protecting your digital identity has never been easier. Follow these three simple steps to secure your online presence.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="group relative rounded-lg border border-dark-carbon bg-midnight-void p-8 transition-colors duration-300 hover:border-slate"
            >
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center justify-center rounded-full bg-amber-glow px-3 py-1 text-[13px] font-normal leading-[1.43] text-midnight-void">
                  Step {step.number}
                </span>
              </div>

              <motion.div
                className="mb-6 mt-2 flex h-14 w-14 items-center justify-center rounded-lg border border-dark-carbon bg-deep-space text-polar-white transition-colors duration-300 group-hover:border-slate"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
              >
                <step.icon className="h-7 w-7" strokeWidth={1.5} />
              </motion.div>

              <h3 className="mb-3 text-[23px] font-bold leading-[1.11] text-polar-white">{step.title}</h3>
              <p className="text-base font-normal leading-relaxed text-ash-gray">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 bg-dark-carbon md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
