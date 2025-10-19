import { useEffect, useState } from "react";
import api from "../services/api";

interface ClothingItem {
  id: number;
  item_type: 'shirt' | 'pants';
  image_path: string;
}

interface ClothingGridProps {
  setShirtImage: (file: File | null) => void;
  setPantsImage: (file: File | null) => void;
  selectedShirtId: number | null;
  setSelectedShirtId: (id: number | null) => void;
  selectedPantsId: number | null;
  setSelectedPantsId: (id: number | null) => void;
}
const ClothingGrid = ({
  setShirtImage,
  setPantsImage,
  selectedShirtId,
  setSelectedShirtId,
  selectedPantsId,
  setSelectedPantsId,
}: ClothingGridProps) => {
  const [items, setItems] = useState<ClothingItem[]>([]);
  const minCells = 12; // 3 columns x 4 rows

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get<ClothingItem[]>("/api/clothing/");
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch clothing items:", error);
      }
    };
    fetchItems();
  }, []);

  const handleSelect = async (item: ClothingItem) => {
    try {
      // If the clicked shirt is already selected, deselect it.
      if (item.item_type === 'shirt' && selectedShirtId === item.id) {
        setShirtImage(null);
        setSelectedShirtId(null);
        return; // Stop further execution
      }

      // If the clicked pants are already selected, deselect them.
      if (item.item_type === 'pants' && selectedPantsId === item.id) {
        setPantsImage(null);
        setSelectedPantsId(null);
        return; // Stop further execution
      }

      // Otherwise, proceed with selecting the new item.
      const imageUrl = `${api.defaults.baseURL}/${item.image_path}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = item.image_path.split(/[\\/]/).pop()!;
      const file = new File([blob], filename, { type: blob.type });

      if (item.item_type === 'shirt') {
        setShirtImage(file);
        setSelectedShirtId(item.id);
      } else if (item.item_type === 'pants') {
        setPantsImage(file);
        setSelectedPantsId(item.id);
      }
    } catch (error) {
      console.error("Error fetching or creating file from item:", error);
    }
  };

  const placeholderCount = Math.max(0, minCells - items.length);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelect(item)}
          className={`flex flex-col items-stretch justify-between bg-white border-2 rounded-lg overflow-hidden min-w-0 aspect-square cursor-pointer
            ${(item.item_type === 'shirt' && selectedShirtId === item.id) || (item.item_type === 'pants' && selectedPantsId === item.id) 
              ? 'border-gray-300 border-4'
              : 'border-gray-300'
            }
          `}
        >
          <img
            src={`${api.defaults.baseURL}/${item.image_path}`}
            alt={item.item_type}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="bg-gray-100 border-2 border-gray-300 rounded-lg aspect-square"
        />
      ))}
    </div>
  );
};

export default ClothingGrid;