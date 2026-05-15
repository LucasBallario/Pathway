"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Mail, Linkedin, Twitter } from "lucide-react"
import { fadeInUp, staggerContainer, staggerItem, viewReveal } from "@/lib/motion-presets"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="border-t border-dark-carbon bg-deep-space"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewReveal}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
        >
          <motion.div variants={staggerItem} className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[1.28] text-polar-white">Pathway</h3>
            </div>
            <p className="text-ash-gray text-[13px] leading-[1.43]">
            Track and understand your digital footprint. Take control of your online identity.
            </p>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[13px] font-normal uppercase tracking-[0.12em] text-ash-gray">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                Characteristics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                    Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Roadmap
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[13px] font-normal uppercase tracking-[0.12em] text-ash-gray">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Contact
                </Link>
              </li>

            </ul>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[13px] font-normal uppercase tracking-[0.12em] text-ash-gray">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Privacity
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-polar-white text-[14px] font-normal underline-offset-4 hover:underline">
                  Support
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-dark-carbon py-8" />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewReveal}
          variants={fadeInUp}
        >
          <p className="text-ash-gray text-[13px] text-center md:text-left">
            © {currentYear} Pathway. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <motion.a
              href="https://twitter.com"
              aria-label="Twitter"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-lg p-2 text-ash-gray transition-colors hover:bg-midnight-void hover:text-polar-white"
            >
              <Twitter className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-lg p-2 text-ash-gray transition-colors hover:bg-midnight-void hover:text-polar-white"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:info@pathway.com"
              aria-label="Email"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-lg p-2 text-ash-gray transition-colors hover:bg-midnight-void hover:text-polar-white"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
