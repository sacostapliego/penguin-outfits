import PlayerCard from "./PlayerCard";
import ClothingGrid from "./ClothingGrid";
import UploadOverlay from "./UploadOverlay";
import { useEffect, useRef, useState } from "react";
import HistoryGrid from "./HistoryGrid";
import BackgroundGrid from "./BackgroundGrid";

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
  selectedBackground: string | null;
  setSelectedBackground: (url: string | null) => void;
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
  selectedBackground,
  setSelectedBackground,
}: InventoryProps) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'wardrobe' | 'model' | 'background'>('wardrobe');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'wardrobe', label: 'Clothes' },
    { value: 'model', label: 'Full-shot' },
    { value: 'background', label: 'Background' }
  ];

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  
  return (
    <div className="flex flex-col h-full">
      <UploadOverlay
        isOpen={isOverlayOpen}
        onClose={() => setOverlayOpen(false)}
        setUserImage={setUserImage}
      />
      <div className="grid grid-cols-[450px_1fr] flex-grow items-center">
        <div className="col-span-1 ml-4 flex items-center justify-center">
          <PlayerCard
            userImage={userImage}
            setUserImage={setUserImage}
            setResultImage={setResultImage}
            onUploadClick={() => setOverlayOpen(true)}
            selectedShirtId={selectedShirtId}
            selectedPantsId={selectedPantsId}
            selectedBackground={selectedBackground}
          />
        </div>

        <div className="col-span-1 flex flex-col h-full justify-center ">
          <div className="relative bg-white border-black border-t-4 border-r-4 border-b-4 rounded-tr-2xl rounded-b-2xl p-4 h-[550px] pr-10 w-full max-w-full">
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
              ) : activeTab === 'model' ? (
                <HistoryGrid setUserImage={setUserImage} />
              ) : (
                <BackgroundGrid 
                  onSelectBackground={setSelectedBackground}
                  selectedBackground={selectedBackground}
                />
              )}
            </div>

            {/* Custom Dropdown Menu "Hanging Sign" */}
            <div ref={dropdownRef} className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-1/2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-2 text-center text-lg font-bold bg-white text-black border-l-4 border-r-4 border-b-4 border-black cursor-pointer focus:outline-none rounded-b-2xl"
              >
                {options.find(opt => opt.value === activeTab)?.label}
              </button>

              {isDropdownOpen && (
                <div className="absolute bottom-full w-full bg-white border-l-4 border-r-4 border-t-4 border-black rounded-t-2xl shadow-lg">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setActiveTab(option.value as 'wardrobe' | 'model' | 'background');
                        setIsDropdownOpen(false);
                      }}
                      // YOU CAN STYLE THESE DIVS FREELY
                      className="p-2 text-center text-lg font-bold cursor-pointer rounded-2xl hover:bg-gray-300"
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;