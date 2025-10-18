import UploadSection from "./UploadSection";

interface UploadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  setUserImage: (file: File | null) => void;
  setShirtImage: (file: File | null) => void;
  setPantsImage: (file: File | null) => void;
}

const UploadOverlay = ({
  isOpen,
  onClose,
  setUserImage,
  setShirtImage,
  setPantsImage,
}: UploadOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 space-y-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center">Upload Your Images</h2>
        <UploadSection title="Upload Your Photo" onFileChange={setUserImage} />
        <UploadSection title="Upload Shirt" onFileChange={setShirtImage} />
        <UploadSection title="Upload Pants" onFileChange={setPantsImage} />
        <button
          onClick={onClose}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadOverlay;