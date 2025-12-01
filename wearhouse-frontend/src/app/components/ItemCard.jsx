export default function ItemCard({ item, isSelected, toggleSelect }) {
  return (
    <button
      onClick={() => toggleSelect(item.id)}
      className={`relative border p-2 rounded ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <img 
        src={item.imageLink}
        alt={item.productDisplayName}
        className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-2 text-sm">
        <div className="font-medium">{item.productDisplayName}</div>
        <div className="text-xs text-gray-500">{item.subCategory}</div>
        <div className="text-xs text-gray-500">{item.gender}</div>
      </div>
      {isSelected && (
        <div className="absolute top-1 right-1 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
          ✓
        </div>
      )}
    </button>
  );
}
