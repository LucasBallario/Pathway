'use client'
import React from 'react'
import { motion } from 'motion/react'
import ResultSection from '../../components/ResultSection'
import { useScan } from "@/app/context/ScanContext"
import { fadeInUp } from '@/lib/motion-presets'



export default function Results() {
  const { scanResults } = useScan()
  console.log("RESULTS PAGE DATA:", scanResults)

  console.log(scanResults)

  if (!scanResults) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-midnight-void px-4 py-16">
        <motion.p
          className="text-center text-[14px] font-normal text-ash-gray"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          No scan data available. Please go back and run a scan.
        </motion.p>
      </main>
    )
  }

  const sections = [
    { title: "Google", key: "google" },
    { title: "Social Media", key: "social" },
    { title: "Usernames", key: "usernames" },
    { title: "Data Leaks", key: "leaks" },
    { title: "Public Records", key: "publicRecords" },
  ]

  const adaptedResults = {
    ...scanResults,
    usernames: scanResults.usernames?.map(item => ({
      title: `${item.username} on ${item.site}`,
      snippet: `Status: ${item.exists} (${item.status})`,
      url: item.url,
      source: "username",
    })),
  }


  return (
    <main className="min-h-screen bg-midnight-void px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl space-y-16">
        {sections.map((section) => (
          <ResultSection
            key={section.key}
            title={section.title}
            items={adaptedResults[section.key]}
          />
        ))}
      </div>
    </main>
  )
}
