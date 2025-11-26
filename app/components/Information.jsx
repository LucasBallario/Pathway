import { Shield, Database, AlertCircle } from "lucide-react"

export default function Information() {
  const benefits = [
    {
      icon: AlertCircle,
      title: "Data Exposure Risk",
      description: "+80% of people have personal data exposed without knowing it",
    },
    {
      icon: Database,
      title: "Unauthorized Databases",
      description: "Your email may be in public databases without your consent",
    },
    {
      icon: Shield,
      title: "Security Threats",
      description: "Leaked passwords, old profiles, indexed posts can be used by attackers",
    },
  ]

  return (
    <section className="w-full py-16 mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Why use Pathway?</h2>
          <p className="text-gray-300 text-lg">
            Protect your personal information from threats and unauthorized exposure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 hover:bg-slate-750 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Icon className="w-6 h-6 text-blue-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
