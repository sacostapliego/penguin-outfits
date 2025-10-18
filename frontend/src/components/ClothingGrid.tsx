import PreviewSection from "./PreviewSection";

interface ClothingGridProps {
  shirtImage: File | null;
  setShirtImage: (file: File | null) => void;
  pantsImage: File | null;
  setPantsImage: (file: File | null) => void;
}

const ClothingGrid = ({
  shirtImage,
  pantsImage,
}: ClothingGridProps) => {
  return (
    // Match PlayerCard's height (slightly shorter if desired)
    <div className="bg-white border-black border-t-4 border-r-4 border-b-4 rounded-2xl p-4 h-[530px] pr-10 w-full max-w-full flex items-center">
      <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full">
        {/* Cells */}
        <div className="flex flex-col items-stretch justify-between bg-white border-2 border-gray-300 rounded-lg overflow-hidden min-w-0 aspect-square">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <PreviewSection image={shirtImage} />
          </div>
        </div>

        <div className="flex flex-col items-stretch justify-between bg-white border-2 border-gray-300 rounded-lg overflow-hidden min-w-0 aspect-square">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <PreviewSection image={pantsImage} />
          </div>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden min-w-0 aspect-square"
          />
        ))}
      </div>
    </div>
  );
};

export default ClothingGrid;