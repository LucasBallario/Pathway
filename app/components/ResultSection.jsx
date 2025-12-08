import ResultItem from "./ResultItem"

export default function ResultSection({ title, items }) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>

      {(!items || items.length === 0) ? (
        <p className="text-slate-500 text-sm">
          No results found in this category.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <ResultItem key={index} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
