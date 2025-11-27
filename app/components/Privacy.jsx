"use client"

import { GlobeLock, ShieldOff, BookCheck, BadgeX } from "lucide-react"

export default function Privacy() {
  const features = [
    {
      icon: GlobeLock,
      title: "Your Privacy Matters to Us",
      description: "We prioritize your security and implement industry-leading protections",
    },
    {
      icon: ShieldOff,
      title: "We Don't Store Your Data",
      description: "No personal information is saved on our servers",
    },
    {
      icon: BookCheck,
      title: "Only Public Sources",
      description: "We use exclusively public, verified data sources",
    },
    {
      icon: BadgeX,
      title: "Delete Anytime",
      description: "Remove your information with a single click",
    },
  ]

  return (
    <section className="py-16 mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2 className="text-4xl text-white sm:text-5xl font-bold text-pretty mb-4 text-foreground">Your Privacy Matters to Us</h2>
        <p className="text-lg text-muted-foreground">
          We are committed to protecting your data with transparent, secure practices
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="inline-flex w-fit rounded-lg bg-primary/10 p-3">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="text-xl font-semibold text-foreground leading-tight">{feature.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
