"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { fadeInUp, scaleIn, staggerContainer, staggerItem } from "@/lib/motion-presets"

export default function ConsentPage() {
  const Router = useRouter()
  const [isConsented, setIsConsented] = useState(false)

  const handleContinue = () => {
    if (isConsented) {
      console.log("Consent accepted")
      Router.push('/form')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-midnight-void px-4 py-10">
      <div className="w-full max-w-md">
        <motion.div
          className="mb-8 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="mb-2 text-[1.75rem] font-bold leading-[1.22] text-polar-white">Consent Required</h1>
          <p className="text-[13px] font-normal leading-[1.43] text-ash-gray">We need your permission to continue</p>
        </motion.div>

        <motion.div
          className="space-y-6 rounded-lg border border-dark-carbon bg-deep-space p-6"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
            <motion.p variants={staggerItem} className="text-[14px] font-normal leading-relaxed text-polar-white">
              To analyze your digital footprint, we need your permission to search publicly available information using
              the details you provide.
            </motion.p>

            <motion.div variants={staggerItem} className="space-y-3 rounded-lg border border-dark-carbon bg-midnight-void p-4">
              <h2 className="text-sm font-bold text-polar-white">We will:</h2>
              <ul className="space-y-2">
                <li className="flex gap-3 text-[14px] text-polar-white">
                  <span className="font-normal text-amber-glow">•</span>
                  <span>Only use your data for the scan</span>
                </li>
                <li className="flex gap-3 text-[14px] text-polar-white">
                  <span className="font-normal text-amber-glow">•</span>
                  <span>Never store, sell, or share your information</span>
                </li>
                <li className="flex gap-3 text-[14px] text-polar-white">
                  <span className="font-normal text-amber-glow">•</span>
                  <span>Only search public sources</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start gap-3 py-2">
              <Checkbox
                id="consent"
                checked={isConsented}
                onCheckedChange={(checked) => setIsConsented(checked)}
                className="mt-1"
              />
              <label htmlFor="consent" className="cursor-pointer text-[14px] font-normal leading-relaxed text-polar-white">
                I understand and give consent to perform the digital footprint scan.
              </label>
            </motion.div>

            <motion.div variants={staggerItem}>
              <Button onClick={() => handleContinue()} disabled={!isConsented} size="lg" className="w-full">
                Continue
              </Button>
            </motion.div>

            <motion.p variants={staggerItem} className="text-center text-[13px] font-normal leading-[1.43] text-ash-gray">
              By checking the box and continuing, you agree to allow this app to perform a digital footprint search using
              the information you submit.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
