"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


export default function ConsentPage() {
  const [isConsented, setIsConsented] = useState(false)

  const handleContinue = () => {
    if (isConsented) {
      console.log("Consent accepted")
    // redirigir
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Consent Required</h1>
          <p className="text-sm text-muted-foreground">We need your permission to continue</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-foreground text-sm leading-relaxed">
              To analyze your digital footprint, we need your permission to search publicly available information using
              the details you provide.
            </p>

            <div className="space-y-3 bg-secondary/50 rounded p-4">
              <h2 className="font-semibold text-foreground text-sm">We will:</h2>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm text-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>Only use your data for the scan</span>
                </li>
                <li className="flex gap-3 text-sm text-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>Never store, sell, or share your information</span>
                </li>
                <li className="flex gap-3 text-sm text-foreground">
                  <span className="text-primary font-bold">•</span>
                  <span>Only search public sources</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 py-2">
            <Checkbox
              id="consent"
              checked={isConsented}
              onCheckedChange={() => setIsConsented()}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-foreground leading-relaxed cursor-pointer">
              I understand and give consent to perform the digital footprint scan.
            </label>
          </div>

          <Button onClick={handleContinue} disabled={!isConsented} size="lg" className="w-full">
            Continue
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By checking the box and continuing, you agree to allow this app to perform a digital footprint search using
            the information you submit.
          </p>
        </div>
      </div>
    </main>
  )
}
