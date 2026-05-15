import type { Transition, Variants } from "motion/react"

/** Editorial ease — calm deceleration */
export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const softSpring: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.85,
}

export const viewReveal = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -40px 0px",
} as const

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
      when: "beforeChildren",
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: smoothEase },
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: smoothEase },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: softSpring,
  },
}
