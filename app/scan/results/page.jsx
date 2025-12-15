'use client'
import React from 'react'
import ResultSection from '../../components/ResultSection'
import { useScan } from "@/app/context/ScanContext"



export default function Results() {
  const { scanResults } = useScan()
  console.log("RESULTS PAGE DATA:", scanResults)

  console.log(scanResults)

  if (!scanResults) {
    return <p>No scan data available. Please go back and run a scan.</p>
  }

  const sections = [
    { title: "Google", key: "google" },
    { title: "Social Media", key: "social" },
    { title: "Usernames", key: "usernames" },
    { title: "Data Leaks", key: "leak" },
    { title: "Public Records", key: "public" },
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
    <div className="space-y-8">
      {sections.map((section) => (
        <ResultSection
          key={section.key}
          title={section.title}
          items={adaptedResults[section.key]}
        />
      ))}
     
    </div>
  )
}
