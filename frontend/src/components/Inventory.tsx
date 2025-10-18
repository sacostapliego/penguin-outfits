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
  selectedShirtId: number | null;
  setSelectedShirtId: (id: number | null) => void;
  selectedPantsId: number | null;
  setSelectedPantsId: (id: number | null) => void;
}

const Inventory = ({
  userImage,
  setUserImage,
  setShirtImage,
  setPantsImage,
  setResultImage,
  selectedShirtId,
  setSelectedShirtId,
  selectedPantsId,
  setSelectedPantsId,
}: InventoryProps) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  
  return (
    <div className="flex flex-col h-full">
      <UploadOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        setUserImage={setUserImage}
      />
      <div className="grid grid-cols-[425px_1fr] flex-grow items-center">
        <div className="col-span-1 ml-4 flex items-center justify-center">
          <PlayerCard
            userImage={userImage}
            setUserImage={setUserImage}
            setResultImage={setResultImage}
            onUploadClick={() => setOverlayOpen(true)}
            selectedShirtId={selectedShirtId}
            selectedPantsId={selectedPantsId}
          />
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <ClothingGrid
            setShirtImage={setShirtImage}
            setPantsImage={setPantsImage}
            selectedShirtId={selectedShirtId}
            setSelectedShirtId={setSelectedShirtId}
            selectedPantsId={selectedPantsId}
            setSelectedPantsId={setSelectedPantsId}
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;