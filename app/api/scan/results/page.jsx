import React from 'react'
import ResultSection from '../../../components/ResultSection'

export default function Results() {
  const { scanResults } = useScan()

  return (
    <div>
      <h1>Digital footprint report</h1>
      <ResultSection title='Google' items={scanResults.google} />
      <ResultSection title="Social Media" items={scanResults.socialMedia} />
      <ResultSection title="Usernames" items={scanResults.usernames} /> 
    </div>
  )
}
