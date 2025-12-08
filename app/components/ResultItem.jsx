import { Search, CircleUser, CloudAlert, FileText, User } from 'lucide-react'

export default function ResultItem({ item }) {

  let icon
  switch (item.source) {
    case "google":
      icon = <Search className="text-slate-600" size={20} />
      break
    case "social":
      icon = <CircleUser className="text-blue-600" size={20} />
      break
    case "leak":
      icon = <CloudAlert className="text-red-600" size={20} />
      break
    case "username":
      icon = <User className="text-purple-600" size={20} />
      break
    case "public":
      icon = <FileText className="text-green-600" size={20} />
      break
    default:
      icon = <FileText className="text-slate-500" size={20} />
  }

  const sourceLabel = {
    google: "Search Engine Result",
    social: "Social Media Match",
    leak: "Data Leak",
    username: "Username Match",
    public: "Public Record"
  }[item.source] || "Unknown Source"

  return (
    <div className="rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all bg-white">
      
     
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-slate-800">
          {item.title}
        </h3>
      </div>

      
      <p className="text-xs text-slate-500 mb-3">{sourceLabel}</p>

      
      {item.snippet ? (
        <p className="text-sm text-slate-700 mb-3">{item.snippet}</p>
      ) : (
        <p className="text-sm text-slate-500 italic mb-3">No description available</p>
      )}

      
      {item.url && (
        <a 
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
        >
          View source
        </a>
      )}
    </div>
  )
}
