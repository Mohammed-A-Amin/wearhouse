export default function SearchHistory({ history, setQuery }) {
  return (
    <div className="flex flex-wrap gap-2">
      {history.map((tag) => (
        <button
          key={tag}
          onClick={() => setQuery(tag)}
          className="px-3 py-1 bg-orange-100 border border-orange-300 text-orange-700 rounded text-xs"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}