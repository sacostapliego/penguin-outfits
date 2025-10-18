import PlayerCard from "./PlayerCard";
import ClothingGrid from "./ClothingGrid";
import UploadOverlay from "./UploadOverlay";
import { useState } from "react";

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
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-full">
      <UploadOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        setUserImage={setUserImage}
        setShirtImage={setShirtImage}
        setPantsImage={setPantsImage}
      />
      <div className="grid grid-cols-[375px_1fr] flex-grow items-center">
        <div className="col-span-1 ml-4 flex items-center justify-center">
          <PlayerCard
            userImage={userImage}
            setUserImage={setUserImage}
            shirtImage={shirtImage}
            pantsImage={pantsImage}
            setResultImage={setResultImage}
            onUploadClick={() => setOverlayOpen(true)}
          />
        </div>

        <div className="col-span-1 flex items-center justify-center">
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