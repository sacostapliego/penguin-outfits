import axios from "axios";

interface Props {
  userImage: File | null;
  shirtImage: File | null;
  pantsImage: File | null;
  setResultImage: (url: string | null) => void;
}

export default function GenerateButton({
  userImage,
  shirtImage,
  pantsImage,
  setResultImage,
}: Props) {
  const handleGenerate = async () => {
    if (!userImage || (!shirtImage && !pantsImage)) {
      alert("Please upload your image and at least one clothing item.");
      return;
    }

    const formData = new FormData();
    formData.append("user_image", userImage);
    if (shirtImage) formData.append("shirt_image", shirtImage);
    if (pantsImage) formData.append("pants_image", pantsImage);

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResultImage(response.data.generated_image_url);
    } catch (error) {
      console.error(error);
      alert("Failed to generate image");
    }
  };

  return (
    <button
      onClick={handleGenerate}
      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Generate Look
    </button>
  );
}
