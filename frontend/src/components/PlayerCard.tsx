import UploadSection from "./UploadSection";
import PreviewSection from "./PreviewSection";

interface PlayerCardProps {
  userImage: File | null;
  setUserImage: (file: File | null) => void;
}

const PlayerCard = ({ userImage, setUserImage }: PlayerCardProps) => {
  return (
    <div className="bg-blue-800 h-full rounded-lg p-4 flex flex-col items-center space-y-4">
      <h2 className="text-white font-bold text-lg">Your Character</h2>
      <div className="w-full h-64">
        <PreviewSection image={userImage} />
      </div>
      <UploadSection
        title="Upload Full Body Image"
        onFileChange={setUserImage}
      />
    </div>
  );
};

export default PlayerCard;