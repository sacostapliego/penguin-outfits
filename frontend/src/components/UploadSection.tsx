interface Props {
  title: string;
  onFileChange: (file: File | null) => void;
}

export default function UploadSection({ title, onFileChange }: Props) {
  return (
    <div className="w-full">
      <label className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold py-2 px-4 rounded-lg inline-block text-center">
        <span>{title}</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
    </div>
  );
}