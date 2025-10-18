import UploadSection from "./UploadSection";
import PreviewSection from "./PreviewSection";

interface ClothingGridProps {
  shirtImage: File | null;
  setShirtImage: (file: File | null) => void;
  pantsImage: File | null;
  setPantsImage: (file: File | null) => void;
}

const ClothingGrid = ({
  shirtImage,
  setShirtImage,
  pantsImage,
  setPantsImage,
}: ClothingGridProps) => {
  return (
    <div className="bg-gray-600 h-[550px] rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="flex flex-col items-center justify-center space-y-2 bg-gray-500 rounded-lg p-2">
          <div className="w-full h-32">
            <PreviewSection image={shirtImage} />
          </div>
          <UploadSection title="Upload Shirt" onFileChange={setShirtImage} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 bg-gray-500 rounded-lg p-2">
          <div className="w-full h-32">
            <PreviewSection image={pantsImage} />
          </div>
          <UploadSection title="Upload Pants" onFileChange={setPantsImage} />
        </div>
        {/* You can add more empty slots here to fill the grid */}
        <div className="bg-gray-500 rounded-lg"></div>
        <div className="bg-gray-500 rounded-lg"></div>
        <div className="bg-gray-500 rounded-lg"></div>
        <div className="bg-gray-500 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ClothingGrid;