import PreviewSection from "./PreviewSection";
import UploadSectionPlayer from "./UploadSectionPlayer";

interface PlayerCardProps {
  userImage: File | null;
  setUserImage: (file: File | null) => void;
  setResultImage: (url: string | null) => void;
  onUploadClick: () => void;
  selectedShirtId: number | null;
  selectedPantsId: number | null;
}

const PlayerCard = ({
  userImage,
  setUserImage,
  setResultImage,
  onUploadClick,
  selectedShirtId,
  selectedPantsId,
}: PlayerCardProps) => {
  return (
    <div className="
      relative
      bg-playercard
      h-[600px] w-[425px]
      rounded-2xl 
      p-4 pt-8 flex 
      flex-col 
      items-center 
      text-white
      border-4 border-playercard-border"
      >
      {/* Member Badge */}
      <img 
        src="/membership.png" 
        alt="Member Badge" 
        className="absolute top-[10px] left-[10px] w-24"
      />

      {/* Top Bar: Close Button */}
      <div className="w-full flex justify-end items-start mb-2 h-[5%]">
        <div className="p-1 cursor-pointer">
        </div>
      </div>

      {/* Image Preview Section with fixed height */}
      <div className="
      w-full 
      h-[75%] 
      bg-player
      rounded-2xl
      mb-2
      flex
      overflow-hidden
      ">
        <PreviewSection image={userImage} />
      </div>

      {/* Upload and Info Section */}
      <UploadSectionPlayer
        onFileChange={setUserImage}
        userImage={userImage}
        setResultImage={setResultImage}
        onUploadClick={onUploadClick}
        selectedShirtId={selectedShirtId}
        selectedPantsId={selectedPantsId}
      />
    </div>
  );
};

export default PlayerCard;