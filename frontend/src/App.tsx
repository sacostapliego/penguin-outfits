import { useState } from "react";
import Inventory from "./components/Inventory";

function App() {
  const [userImage, setUserImage] = useState<File | null>(null);
  const [shirtImage, setShirtImage] = useState<File | null>(null);
  const [pantsImage, setPantsImage] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-blue-500 flex justify-center items-center font-sans">
      <div
        className="bg-[url('/inventory-bg.png')] bg-no-repeat bg-center bg-contain p-12"
        style={{ width: "1024px", height: "660px" }}
      >
        <div className="bg-gray-700 h-full w-full rounded-lg p-4">
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