import { Search, CircleUser, CloudAlert, User, FileText } from "lucide-react"

export default function ResultItem({ item }) {

  const renderIcon = () => {
    // Elegir icono segun el source
    switch (item.source) {
      case "google":
        return <Search className="w-5 h-5 text-slate-600" />
      case "social":
        return <CircleUser className="w-5 h-5 text-slate-600" />
      case "leak":
        return <CloudAlert className="w-5 h-5 text-red-600" />
      case "username":
        return <User className="w-5 h-5 text-slate-600" />
      case "public":
        return <FileText className="w-5 h-5 text-slate-600" />
      default:
        return <Search className="w-5 h-5 text-slate-600" />
    }
  }

  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {renderIcon()}
        <h3 className="font-semibold text-slate-800">{item.title}</h3>
      </div>

      {/* Snippet */}
      <p className="text-slate-600 text-sm mb-3">
        {item.snippet && item.snippet.trim() !== "" 
          ? item.snippet 
          : "No description available."}
      </p>

      {/* Link */}
      <a 
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 text-sm underline break-words"
      >
        {item.url}
      </a>

    </div>
  )
}
