import PreviewSection from "./PreviewSection";
import UploadSectionPlayer from "./UploadSectionPlayer";
import { IoClose } from "react-icons/io5";

interface PlayerCardProps {
  userImage: File | null;
  setUserImage: (file: File | null) => void;
}

const PlayerCard = ({ userImage, setUserImage }: PlayerCardProps) => {
  return (
    <div className="
      relative
      bg-playercard
      h-full w-full
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
        className="absolute top-[-25px] left-[-15px] w-24 z-10"
      />

      {/* Top Bar: Close Button */}
      <div className="w-full flex justify-end items-start mb-2">
        <div className="bg-white rounded-full p-1 cursor-pointer">
          <IoClose color="blue" size={20}/>
        </div>
      </div>

      {/* Image Preview Section with fixed height */}
      <div className="
       w-full 
        h-96 
        bg-player
        rounded-2xl
        mb-2
        flex
      ">
        <PreviewSection image={userImage} />
      </div>

      {/* Upload and Info Section */}
      <UploadSectionPlayer
        title="Upload Full Body Image"
        onFileChange={setUserImage}
      />
    </div>
  );
};

export default PlayerCard;