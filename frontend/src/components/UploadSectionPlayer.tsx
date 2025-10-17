import { TbWorldUpload } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";

interface Props {
  title: string;
  onFileChange: (file: File | null) => void;
}

export default function UploadSection({ onFileChange }: Props) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] || null);
  };

  return (
    <div
      className="
      flex 
      flex-col 
      rounded-lg 
      p-2
      h-1/5
      w-full
      space-y-2
    "
    >
      {/* Other Section */}
      <div className="
        flex
        flex-row
        items-center
      ">
        <div className="w-15 flex justify-center">
            <MdAttachMoney size={30} color="yellow" />
        </div>
        <span className="text-white">Your Coins: 1200</span>
      </div>

      {/* File Upload Section */}
      <div className="
        flex
        flex-row
        items-center
      ">
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
                <div className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition">
                    <TbWorldUpload size={24} />
                </div>
            </div>
            <span className="ml-1 text-white">Upload Full Body Shot</span>
        </label>
      </div>
    </div>
  );
}