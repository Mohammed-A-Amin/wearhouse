export default function ItemCard({ item, isSelected, toggleSelect }) {
  return (
    <button
      onClick={() => toggleSelect(item.id)}
      className={`relative bg-orange-100 border border-orange-300 hover:shadow ${
        isSelected ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="aspect-[4/5] bg-orange-200" />

      <div className="px-2 py-1 text-left text-sm text-gray-700">
        <div className="font-medium">{item.name}</div>
        <div className="text-xs text-gray-500">{item.category}</div>
      </div>

      {isSelected && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
          ✓
        </div>
      )}
    </button>
  );
}