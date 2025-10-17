interface Props {
  image: File | null;
}

export default function PreviewSection({ image }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border p-4 h-64">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className=" max-h-[200px] rounded-lg max-w-[200px] "
        />
      ) : (
        <p className="text-gray-400">No image uploaded</p>
      )}
    </div>
  );
}
