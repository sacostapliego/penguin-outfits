import PlayerCard from "./PlayerCard";
import ClothingGrid from "./ClothingGrid";
import UploadOverlay from "./UploadOverlay";
import { useState } from "react";
import HistoryGrid from "./HistoryGrid"; // Import the new component

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
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'history'>('wardrobe');
  
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

        <div className="col-span-1 flex flex-col h-full justify-center ">

          {/* Main Container: Relative positioning to contain the absolute dropdown */}
          <div className="relative bg-white border-black border-t-4 border-r-4 border-b-4 rounded-tr-2xl rounded-b-2xl p-4 h-[550px] pr-10 w-full max-w-full">
            
            {/* Grid Content */}
            <div className="h-full w-full">
              {activeTab === 'wardrobe' ? (
                <ClothingGrid
                  setShirtImage={setShirtImage}
                  setPantsImage={setPantsImage}
                  selectedShirtId={selectedShirtId}
                  setSelectedShirtId={setSelectedShirtId}
                  selectedPantsId={selectedPantsId}
                  setSelectedPantsId={setSelectedPantsId}
                />
              ) : (
                <HistoryGrid setUserImage={setUserImage} />
              )}
            </div>

            {/* Dropdown Menu "Hanging Sign" */}
            <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 w-1/2">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as 'wardrobe' | 'history')}
                className="w-full p-2 text-center text-lg font-bold rounded-b-2xl bg-white text-black border-l-4 border-r-4 border-b-4 border-black cursor-pointer focus:outline-none"
              >
                <option value="wardrobe">Clothes</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;