import { useState } from "react";
import { TbWorldUpload } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";

interface Props {
  onFileChange: (file: File | null) => void;
  userImage: File | null;
  shirtImage: File | null;
  pantsImage: File | null;
  setResultImage: (url: string | null) => void;
}

export default function UploadSectionPlayer({
  onFileChange,
  userImage,
  shirtImage,
  pantsImage,
  setResultImage,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] || null);
  };

  async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  const handleGenerate = async () => {
    if (!userImage && !shirtImage && !pantsImage) {
      alert("Please upload at least one image.");
      return;
    }

    const fd = new FormData();
    if (userImage) fd.append("user_image", userImage);
    if (shirtImage) fd.append("shirt_image", shirtImage);
    if (pantsImage) fd.append("pants_image", pantsImage);

    try {
      setLoading(true);
      setResultImage(null);

      const url = "http://127.0.0.1:8000/api/tryon/ai";
      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();

      if (res.ok && data.success && data.image_data_url) {
        const newImageFile = await dataUrlToFile(data.image_data_url, "generated-look.png");
        onFileChange(newImageFile);
      } else {
        const msg = data.detail || data.error || "Failed to generate look";
        alert(msg);
      }
    } catch (e: any) {
      alert(e.message);
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
              loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <MdAttachMoney color="yellow" size={24} />
          </div>
        </div>
        <span className="ml-1 text-white">
          {loading ? "Generating..." : "Generate Look"}
        </span>
      </button>

      {/* File Upload Section */}
      <div className="flex flex-row items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center"
        >
          <div className="w-14 flex justify-center">
            <div className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition">
              <TbWorldUpload size={24} />
            </div>
          </div>
          <span className="ml-1 text-white">Upload Image</span>
        </label>
      </div>
    </div>
  );
}