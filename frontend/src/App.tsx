import { useState } from "react";
import Inventory from "./components/Inventory";

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [shirtImage, setShirtImage] = useState<File | null>(null);
  const [pantsImage, setPantsImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-blue-500 flex justify-center items-center font-sans">
      {/* Larger background container */}
      <div
        className="bg-[url('/igloo.png')] bg-no-repeat bg-center bg-contain p-12 flex justify-center items-center rounded-lg"
        style={{ width: "100%", height: "85%" }} // Scale the background higher
      >
        {/* Smaller inventory container */}
        <div className="bg-gray-100 rounded-lg p-4 shadow-lg w-1/2 h-3/4 flex items-center justify-center">
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