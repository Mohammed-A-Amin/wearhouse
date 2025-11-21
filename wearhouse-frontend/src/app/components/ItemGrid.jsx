import ItemCard from "./ItemCard";

export default function ItemGrid({ items, selected, toggleSelect }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isSelected={selected.has(item.id)}
          toggleSelect={toggleSelect}
        />
      ))}
    </div>
  );
}