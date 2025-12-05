export default function ItemCard({ item, isSelected, toggleSelect }) {
  return (
    <button
      onClick={() => toggleSelect(item.id)}
      className={`relative border border-orange-200 p-2 rounded bg-white overflow-hidden hover:shadow-md transition ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
        <img
          src={item.imageLink}
          alt={item.productDisplayName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-2 text-sm text-gray-800">
        <div className="font-medium text-gray-800 leading-tight clamp-2">{item.productDisplayName}</div>
        <div className="text-xs text-orange-700 mt-1">{item.subCategory}</div>
        <div className="text-xs text-orange-700">{item.gender}</div>
      </div>
      {isSelected && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
          ✓
        </div>
      )}
    </button>
  );
}
