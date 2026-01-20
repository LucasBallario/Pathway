import { Search, CircleUser, ShieldAlert as CloudAlert, User, FileText, Bookmark, ExternalLink } from "lucide-react"

export default function ResultItem({ item }) {

  const renderIcon = () => {
    switch (item.source) {
      case "google":
        return <Search className="w-5 h-5 text-muted-foreground" />
      case "social":
        return <CircleUser className="w-5 h-5 text-muted-foreground" />
      case "leak":
        return <CloudAlert className="w-5 h-5 text-destructive" />
      case "username":
        return <User className="w-5 h-5 text-muted-foreground" />
      case "public":
        return <FileText className="w-5 h-5 text-muted-foreground" />
      default:
        return <Search className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getSourceBadge = () => {
    switch (item.source) {
      case "google":
        return { label: "Google", className: "bg-primary text-primary-foreground" }
      case "social":
        return { label: "Social", className: "bg-primary text-primary-foreground" }
      case "leak":
        return { label: "Leak", className: "bg-destructive/10 text-destructive" }
      case "username":
        return { label: "Username", className: "bg-primary text-primary-foreground" }
      case "public":
        return { label: "Public", className: "bg-primary text-primary-foreground" }
      default:
        return { label: "Result", className: "bg-secondary text-secondary-foreground" }
    }
  }

  const badge = getSourceBadge()

  return (
    <div className="bg-background p-5 rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center">
          {renderIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
              {item.title}
            </h3>
            <button className="flex-shrink-0 p-1.5 rounded-md hover:bg-accent transition-colors opacity-60 group-hover:opacity-100">
              <Bookmark className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {item.snippet && item.snippet.trim() !== "" 
              ? item.snippet 
              : "No description available."}
          </p>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md ${badge.className}`}>
                {badge.label}
              </span>
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary text-xs hover:underline truncate max-w-[200px]"
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{item.url}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
