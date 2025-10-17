import PlayerCard from "./PlayerCard";
import ClothingGrid from "./ClothingGrid";
import GenerateButton from "./GenerateButton";

interface InventoryProps {
  userImage: File | null;
  setUserImage: (file: File | null) => void;
  shirtImage: File | null;
  setShirtImage: (file: File | null) => void;
  pantsImage: File | null;
  setPantsImage: (file: File | null) => void;
  resultImage: string | null;
  setResultImage: (image: string | null) => void;
}

const Inventory = ({
  userImage,
  setUserImage,
  shirtImage,
  setShirtImage,
  pantsImage,
  setPantsImage,
  resultImage,
  setResultImage,
}: InventoryProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <div className="col-span-1">
          <PlayerCard userImage={userImage} setUserImage={setUserImage} />
        </div>
        <div className="col-span-2">
          <ClothingGrid
            shirtImage={shirtImage}
            setShirtImage={setShirtImage}
            pantsImage={pantsImage}
            setPantsImage={setPantsImage}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <GenerateButton
          userImage={userImage}
          shirtImage={shirtImage}
          pantsImage={pantsImage}
          setResultImage={setResultImage}
        />
      </div>
      {resultImage && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Generated Look
          </h2>
          <img
            src={resultImage}
            alt="Result"
            className="rounded-xl shadow-md max-h-[200px] mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;