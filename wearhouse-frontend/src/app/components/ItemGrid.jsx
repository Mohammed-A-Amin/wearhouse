export default function ItemGrid({ items, selected, toggleSelect }) {
  const baseUrl = "http://assets.myntassets.com/v1/images/style/properties/";
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => {
        const isSelected = selected.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`relative bg-white border border-orange-200 hover:shadow flex flex-col justify-between h-[320px] overflow-hidden rounded`}
          >
            <div className="w-full h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={item.imageLink}
                alt={item.productDisplayName}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-3 py-2 text-left text-sm text-gray-800">
              <div className="font-medium leading-tight clamp-2">{item.productDisplayName}</div>
              <div className="text-xs text-orange-700 mt-1">{item.masterCategory}</div>
              <div className="text-xs text-orange-700">{item.gender}</div>
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
