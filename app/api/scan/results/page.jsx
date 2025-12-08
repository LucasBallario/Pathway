import React from 'react'
import ResultSection from '../../../components/ResultSection'
import { useScan } from "@/app/context/ScanContext"

export default function Results() {
  const { scanResults } = useScan()

  if (!scanResults) {
    return <p>No scan data available. Please go back and run a scan.</p>
  }

  const sections = [
    { title: "Google", key: "google" },
    { title: "Social Media", key: "social" },
    { title: "Usernames", key: "username" },
    { title: "Data Leaks", key: "leak" },
    { title: "Public Records", key: "public" },
  ]

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <ResultSection
          key={section.key}
          title={section.title}
          items={scanResults[section.key]}
        />
      ))}
    </div>
  )
}
