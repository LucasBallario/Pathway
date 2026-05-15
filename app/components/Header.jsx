'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import Phone from '@/public/phone.svg'
import Information from './Information'
import Instructions from './Instructions'
import Privacy from './Privacy'
import { useRouter } from 'next/navigation'
import { smoothEase, staggerItem } from '@/lib/motion-presets'

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
}

export default function Header() {
  const Router = useRouter()
  return (
    <div className="flex flex-col items-center text-polar-white bg-midnight-void">
      <div className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 w-full max-w-6xl mx-auto gap-12 lg:gap-20">
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={staggerItem} className="text-[13px] leading-[1.43] tracking-[-0.007em] text-ash-gray mb-6 uppercase tracking-[0.2em]">
            Pathway
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="text-[2rem] md:text-[2.75rem] lg:text-[3.9375rem] font-bold leading-[0.95] tracking-[-0.011em] text-polar-white text-balance max-w-xl"
          >
            Find your digital footprint before others do
          </motion.h1>

          <motion.p variants={staggerItem} className="text-base text-ash-gray mt-6 leading-[1.35] max-w-md font-normal">
            We analyze your online presence to help you protect your privacy and reduce digital risks
          </motion.p>

          <motion.button
            variants={staggerItem}
            onClick={() => Router.push('/consent')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 480, damping: 22 }}
            className="mt-10 cursor-pointer rounded-lg bg-black px-6 py-3 text-[14px] font-normal text-absolute-zero transition-colors hover:bg-deep-space"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.94, x: 36 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.72, ease: smoothEase, delay: 0.18 }}
        >
          <Image
            src={Phone || "/placeholder.svg"}
            alt="Phone mockup showing Pathway app interface for digital privacy protection"
            height={380}
            width={380}
            className="h-72 w-72 md:h-80 md:w-80 lg:h-[380px] lg:w-[380px] object-contain"
          />
        </motion.div>
      </div>
      <Information />
      <Instructions />
      <Privacy />
    </div>
  )
}
