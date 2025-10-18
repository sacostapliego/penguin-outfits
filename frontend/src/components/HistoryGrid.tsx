import { useEffect, useState } from "react";
import api from "../services/api";

interface HistoryItem {
  id: number;
  image_path: string;
}

interface HistoryGridProps {
  setUserImage: (file: File | null) => void;
}

const HistoryGrid = ({ setUserImage }: HistoryGridProps) => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const minCells = 12;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get<HistoryItem[]>("/api/clothing/history");
        setHistoryItems(response.data);
      } catch (error) {
        console.error("Failed to fetch generation history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleSelectHistoryItem = async (item: HistoryItem) => {
    try {
      const imageUrl = `${api.defaults.baseURL}/${item.image_path}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = item.image_path.split(/[\\/]/).pop()!;
      const file = new File([blob], filename, { type: blob.type });
      setUserImage(file);
    } catch (error) {
      console.error("Error loading history image:", error);
    }
  };

  const placeholderCount = Math.max(0, minCells - historyItems.length);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full overflow-y-auto">
      {historyItems.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectHistoryItem(item)}
          className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden aspect-square cursor-pointer hover:border-gray-300 hover:border-4"
        >
          <img
            src={`${api.defaults.baseURL}/${item.image_path}`}
            alt="Generated outfit"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Render placeholder squares to fill the grid */}
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="bg-gray-100 border-2 border-gray-300 rounded-lg aspect-square"
        />
      ))}
    </div>
  );
};

export default HistoryGrid;