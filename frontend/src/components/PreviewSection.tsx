interface Props {
  image: File | null;
}

export default function PreviewSection({ image }: Props) {
  return (
    <div className="
      flex items-center 
      justify-center 
      h-full w-full
    ">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      ) : (
        <p className="text-gray-200">No image uploaded</p>
      )}
    </div>
  );
}
