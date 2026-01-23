"use client"

import { Upload, Search, FileCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Upload",
    description: "You upload your information as detailed as possible",
    icon: Upload,
  },
  {
    number: "02",
    title: "Scan",
    description: "Our powerful engine searches all over the internet to find dangerous leaked information about you",
    icon: Search,
  },
  {
    number: "03",
    title: "Report",
    description: "We give you a detailed diagnostic of your situation and what you can do to fix it",
    icon: FileCheck,
  },
]

export default function Instructions() {
  return (
    <section className="w-full py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight text-balance">
            Security at every step
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Protecting your digital identity has never been easier. Follow these three simple steps to secure your online presence.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative bg-card border border-border rounded-xl p-8 transition-all duration-300 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/5"
            >
              {/* Step number badge */}
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold bg-slate-500 text-white rounded-full">
                  Step {step.number}
                </span>
              </div>

              {/* Icon container */}
              <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center mb-6 mt-2 group-hover:bg-slate-700 transition-colors duration-300">
                <step.icon className="w-7 h-7 text-slate-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
