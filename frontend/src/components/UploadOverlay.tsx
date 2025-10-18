import UploadSection from "./UploadSection";
import api from "../services/api";

interface UploadOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  setUserImage: (file: File | null) => void;
}

const UploadOverlay = ({
  isOpen,
  onClose,
  setUserImage,
}: UploadOverlayProps) => {
  if (!isOpen) return null;

  const handleFileChange = async (file: File | null, itemType: 'user' | 'shirt' | 'pants') => {
    if (!file) return;

    if (itemType === 'user') {
      setUserImage(file);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      await api.post(`/api/clothing/upload?item_type=${itemType}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`${itemType} uploaded successfully! It will appear in your grid.`);
    } catch (error) {
      console.error(`Failed to upload ${itemType}`, error);
      alert(`Failed to upload ${itemType}.`);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 space-y-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center">Upload Your Images</h2>
        <UploadSection title="Upload Your Photo" onFileChange={(file) => handleFileChange(file, 'user')} />
        <UploadSection title="Upload Shirt" onFileChange={(file) => handleFileChange(file, 'shirt')} />
        <UploadSection title="Upload Pants" onFileChange={(file) => handleFileChange(file, 'pants')} />
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