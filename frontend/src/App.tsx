import { useState } from "react";
import UploadSection from "./components/UploadSection";
import PreviewSection from "./components/PreviewSection";
import GenerateButton from "./components/GenerateButton";

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [shirtImage, setShirtImage] = useState<File | null>(null);
  const [pantsImage, setPantsImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">AI Virtual Try-On</h1>

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        <UploadSection
          title="Upload Your Full Body Image"
          onFileChange={setUserImage}
        />
        <PreviewSection image={userImage} />

        <UploadSection title="Upload a Shirt" onFileChange={setShirtImage} />
        <PreviewSection image={shirtImage} />

        <UploadSection title="Upload Pants" onFileChange={setPantsImage} />
        <PreviewSection image={pantsImage} />
      </div>

      <GenerateButton
        userImage={userImage}
        shirtImage={shirtImage}
        pantsImage={pantsImage}
        setResultImage={setResultImage}
      />

      {resultImage && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center mb-2">
            Generated Look
          </h2>
          <img
            src={resultImage}
            alt="Result"
            className="rounded-xl shadow-md max-h-[500px]"
          />
        </div>
      )}
    </div>
  );
}

export default App;
