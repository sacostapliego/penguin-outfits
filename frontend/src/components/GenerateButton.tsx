import { useState } from "react";

type Props = {
  userImage: File | null;
  shirtImage: File | null;
  pantsImage: File | null;
  setResultImage: (url: string | null) => void;
};

export default function GenerateButton({
  userImage,
  shirtImage,
  pantsImage,
  setResultImage,
}: Props) {
  // Toggle: set to false to test local compositing (/api/tryon),
  // set to true to use AI text-to-image (/api/tryon/ai).
  const useAI = true;
  const provider = "auto";

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!userImage && !shirtImage && !pantsImage) {
      alert("Please upload at least one image.");
      return;
    }

    const fd = new FormData();
    if (userImage) fd.append("user_image", userImage);
    if (shirtImage) fd.append("shirt_image", shirtImage);
    if (pantsImage) fd.append("pants_image", pantsImage);

    if (useAI) {
      fd.append("provider", provider);
      // fd.append("prompt", "photorealistic full body person wearing a blue t-shirt and black jeans");
    }

    try {
      setLoading(true);
      setResultImage(null);

      const url = useAI
        ? "http://127.0.0.1:8000/api/tryon/ai"
        : "http://127.0.0.1:8000/api/tryon";

      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();

      if (res.ok && data.success && data.image_data_url) {
        setResultImage(data.image_data_url);
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
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`px-4 py-2 rounded text-white ${
        loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
      aria-busy={loading}
    >
      {loading ? "Generating..." : "Generate Look"}
    </button>
  );
}