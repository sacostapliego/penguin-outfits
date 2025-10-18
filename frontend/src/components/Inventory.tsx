import PlayerCard from "./PlayerCard";
import ClothingGrid from "./ClothingGrid";

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
  setResultImage,
}: InventoryProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <div className="col-span-1">
          <PlayerCard
            userImage={userImage}
            setUserImage={setUserImage}
            shirtImage={shirtImage}
            pantsImage={pantsImage}
            setResultImage={setResultImage}
          />
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
    </div>
  );
};

export default Inventory;