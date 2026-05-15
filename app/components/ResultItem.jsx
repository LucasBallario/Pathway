"use client"

import { motion } from "motion/react"
import { Search, CircleUser, ShieldAlert as CloudAlert, User, FileText, Bookmark, ExternalLink } from "lucide-react"
import { staggerItem } from "@/lib/motion-presets"

export default function ResultItem({ item }) {

  const renderIcon = () => {
    switch (item.source) {
      case "google":
        return <Search className="h-5 w-5 text-ash-gray" />
      case "social":
        return <CircleUser className="h-5 w-5 text-ash-gray" />
      case "leak":
        return <CloudAlert className="h-5 w-5 text-amber-glow" />
      case "username":
        return <User className="h-5 w-5 text-ash-gray" />
      case "public":
        return <FileText className="h-5 w-5 text-ash-gray" />
      default:
        return <Search className="h-5 w-5 text-ash-gray" />
    }
  }

  const getSourceBadge = () => {
    switch (item.source) {
      case "google":
        return { label: "Google", className: "bg-dark-carbon text-absolute-zero" }
      case "social":
        return { label: "Social", className: "bg-dark-carbon text-absolute-zero" }
      case "leak":
        return { label: "Leak", className: "bg-amber-glow/20 text-amber-glow" }
      case "username":
        return { label: "Username", className: "bg-dark-carbon text-absolute-zero" }
      case "public":
        return { label: "Public", className: "bg-dark-carbon text-absolute-zero" }
      default:
        return { label: "Result", className: "bg-dark-carbon text-polar-white" }
    }
  }

  const badge = getSourceBadge()

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group rounded-lg border border-dark-carbon bg-midnight-void p-5 transition-colors hover:border-slate"
    >

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-dark-carbon bg-deep-space">
          {renderIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-bold leading-tight text-polar-white">
              {item.title}
            </h3>
            <button type="button" className="flex-shrink-0 rounded-md p-1.5 opacity-60 transition-opacity hover:bg-dark-carbon group-hover:opacity-100">
              <Bookmark className="h-5 w-5 text-ash-gray" />
            </button>
          </div>

          <p className="mb-3 line-clamp-2 text-sm font-normal text-ash-gray">
            {item.snippet && item.snippet.trim() !== ""
              ? item.snippet
              : "No description available."}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-md px-2.5 py-1 text-xs font-normal ${badge.className}`}>
                {badge.label}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-[200px] items-center gap-1 truncate font-mono text-xs font-normal tracking-[-0.022em] text-amber-glow underline-offset-4 hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{item.url}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  )
}
