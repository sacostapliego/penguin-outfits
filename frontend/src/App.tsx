import { useState } from "react";
import Inventory from "./components/Inventory";

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [shirtImage, setShirtImage] = useState<File | null>(null);
  const [pantsImage, setPantsImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-blue-500 flex justify-center items-center font-sans">
      {/* Background container with padding to create the inset effect */}
      <div
        className="bg-[url('/igloo.png')] bg-no-repeat bg-center bg-contain p-12 flex justify-center items-center rounded-lg"
        style={{ width: "90%", height: "85%" }}
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
          />
        </div>
      </div>
    </div>
  );
}

export default App;