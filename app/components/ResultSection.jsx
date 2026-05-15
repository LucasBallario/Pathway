"use client"

import ResultItem from "./ResultItem"
import { motion } from "motion/react"
import { fadeInUp, staggerContainer, staggerItem, viewReveal } from "@/lib/motion-presets"

export default function ResultSection({ title, items }) {
  return (
    <section className="mb-16">
      <motion.h2
        className="mb-4 text-[23px] font-bold leading-[1.11] text-polar-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewReveal}
      >
        {title}
      </motion.h2>

      {(!items || items.length === 0) ? (
        <motion.div
          className="rounded-lg border border-dark-carbon bg-deep-space p-8 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
        >
          <p className="text-sm font-normal text-ash-gray">
            No results found in this category.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
        >
          {items.map((item, index) => (
            <ResultItem key={index} item={item} />
          ))}
        </motion.div>
      )}
    </section>
  )
}
