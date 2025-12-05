export default function ItemGrid({ items, selected, toggleSelect }) {
  const baseUrl = "http://assets.myntassets.com/v1/images/style/properties/"
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => {
        const isSelected = selected.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`relative bg-orange-100 border border-orange-300 hover:shadow flex flex-col justify-between h-[320px]`}
          >
            <img 
            src={item.imageLink}
            alt={item.productDisplayName}
            className="object-cover w-full h-64"
            />
            <div className="px-2 py-1 text-left text-sm text-gray-700">
              <div className="font-medium">{item.productDisplayName}</div>
              <div className="text-xs text-gray-500">{item.masterCategory}</div>
              <div className="text-xs text-gray-500">{item.gender}</div>
            </div>

            {isSelected && (
              <div className="absolute top-1 right-1 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
