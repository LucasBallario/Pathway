import ResultItem from "./ResultItem"

export default function ResultSection({ title, items }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        {title}
      </h2>

      {(!items || items.length === 0) ? (
        <div className="bg-secondary/30 rounded-xl p-8 text-center border border-border">
          <p className="text-muted-foreground text-sm">
            No results found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <ResultItem key={index} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
