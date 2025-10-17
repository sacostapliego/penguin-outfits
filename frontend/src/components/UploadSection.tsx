interface Props {
  title: string;
  onFileChange: (file: File | null) => void;
}

export default function UploadSection({ title, onFileChange }: Props) {
  return (
    <div className="flex flex-col items-center border-2 border-dashed border-gray-400 rounded-lg p-4 bg-white shadow-sm">
      <h2 className="font-semibold mb-2">{title}</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="border p-1"
      />
    </div>
  );
}
