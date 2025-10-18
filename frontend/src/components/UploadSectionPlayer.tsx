import { useState } from "react";
import { TbWorldUpload } from "react-icons/tb";
import { SiGooglegemini } from "react-icons/si";
import api from "../services/api";

interface Props {
  onFileChange: (file: File | null) => void;
  userImage: File | null;
  setResultImage: (url: string | null) => void;
  onUploadClick: () => void;
  selectedShirtId: number | null;
  selectedPantsId: number | null;
}

export default function UploadSectionPlayer({
  onFileChange,
  userImage,
  setResultImage,
  onUploadClick,
  selectedShirtId,
  selectedPantsId,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  const handleGenerate = async () => {
    if (!userImage) {
      alert("Please upload your photo first.");
      return;
    }
    if (!selectedShirtId && !selectedPantsId) {
      alert("Please select a shirt or pants from the grid.");
      return;
    }

    const fd = new FormData();
    fd.append("user_image", userImage);
    if (selectedShirtId) fd.append("shirt_item_id", String(selectedShirtId));
    if (selectedPantsId) fd.append("pants_item_id", String(selectedPantsId));

    try {
      setLoading(true);
      setResultImage(null);

      const res = await api.post("/api/tryon/ai", fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const data = res.data;

      if (res.status === 200 && data.success && data.image_data_url) {
        const newImageFile = await dataUrlToFile(data.image_data_url, "generated-look.png");
        onFileChange(newImageFile);
      } else {
        const msg = data.detail || data.error || "Failed to generate look";
        alert(msg);
      }
    } catch (e: any) {
      const errorMsg = e.response?.data?.detail || e.message || "An unknown error occurred.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      flex 
      flex-col 
      justify-center
      rounded-lg 
      p-2
      h-[20%]
      w-full
      space-y-2
    "
    >
      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="cursor-pointer flex items-center disabled:cursor-not-allowed"
      >
        <div className="w-14 flex justify-center">
          <div
            className={`text-white rounded-full p-2 transition ${
              loading ? "bg-yellow-400" : "bg-yellow-500 hover:bg-yellow-400"
            }`}
          >
            <SiGooglegemini color="black" size={24} />
          </div>
        </div>
        <span className="ml-1 font-medium text-black">
          {loading ? "Generating..." : "Generate Look"}
        </span>
      </button>

      {/* File Upload Section */}
      <div className="flex flex-row items-center">
        <label
          onClick={onUploadClick}
          className="cursor-pointer flex items-center"
        >
          <div className="w-14 flex justify-center">
            <div className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition">
              <TbWorldUpload size={24} />
            </div>
          </div>
          <span className="ml-1 font-medium text-black">Upload Image</span>
        </label>
      </div>
    </div>
  );
}