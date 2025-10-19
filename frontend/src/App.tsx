import { useState } from "react";
import Inventory from "./components/Inventory";

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [shirtImage, setShirtImage] = useState<File | null>(null);
  const [pantsImage, setPantsImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedShirtId, setSelectedShirtId] = useState<number | null>(null);
  const [selectedPantsId, setSelectedPantsId] = useState<number | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-blue-500 flex justify-center items-center font-sans">
      {/* Background container with padding to create the inset effect */}
      <div
        className="bg-[url('/igloo.png')] bg-no-repeat bg-center bg-contain p-12 flex justify-center items-center rounded-lg"
        style={{ width: "100%", height: "90%" }}
      >
        {/* Inventory container that fills the padded area and centers its content */}
        <div className="w-full h-full flex items-center justify-center">
          <Inventory
            userImage={userImage}
            setUserImage={setUserImage}
            shirtImage={shirtImage}
            setShirtImage={setShirtImage}
            pantsImage={pantsImage}
            setPantsImage={setPantsImage}
            resultImage={resultImage}
            setResultImage={setResultImage}
            selectedShirtId={selectedShirtId}
            setSelectedShirtId={setSelectedShirtId}
            selectedPantsId={selectedPantsId}
            setSelectedPantsId={setSelectedPantsId}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
          />
        </div>
      </div>
    </div>
  );
}

export default App;