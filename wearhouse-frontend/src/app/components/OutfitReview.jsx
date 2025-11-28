export default function OutfitPreview() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-[#F06728] mb-4">Today’s Outfit</h2>

      <div className="w-72 h-[500px] bg-[#F4C6D8] border-4 border-[#C43757]" />

      <button className="mt-4 w-48 py-2 rounded-md bg-[#D94F6A] text-white">
        Generate Outfit
      </button>

      <p className="text-xs text-[#C13F5A] mt-1">
        Not loading correctly? <span className="underline cursor-pointer">Redraw</span>
      </p>
    </div>
  );
}