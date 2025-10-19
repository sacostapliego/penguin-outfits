interface BackgroundGridProps {
  onSelectBackground: (imageUrl: string | null) => void;
  selectedBackground: string | null;
}

const backgroundImages = [
  '/backgrounds/rockhopper.png',
  '/backgrounds/SpookyTrees.png',
];

const BackgroundGrid = ({ onSelectBackground, selectedBackground }: BackgroundGridProps) => {
  const minCells = 12;
  const placeholderCount = Math.max(0, minCells - backgroundImages.length);

  const handleSelect = (imageUrl: string) => {
    // Allow deselecting by clicking the same image again
    if (selectedBackground === imageUrl) {
      onSelectBackground(null);
    } else {
      onSelectBackground(imageUrl);
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-3 w-full h-full overflow-y-auto">
      {backgroundImages.map((imgSrc, index) => (
        <div
          key={index}
          onClick={() => handleSelect(imgSrc)}
          className={`bg-white border-2 rounded-lg overflow-hidden aspect-square cursor-pointer
            ${selectedBackground === imgSrc ? 'border-gray-300 border-4' : 'border-gray-300'}
          `}
        >
          <img
            src={imgSrc}
            alt={`Background ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* Render placeholder squares to maintain grid size */}
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <div
          key={`placeholder-${index}`}
          className="bg-gray-100 border-2 border-gray-300 rounded-lg aspect-square"
        />
      ))}
    </div>
  );
};

export default BackgroundGrid;