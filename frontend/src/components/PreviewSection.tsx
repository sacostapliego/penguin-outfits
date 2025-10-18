export default function PreviewSection({ image }: { image: File | null }) {
  if (!image) return null;
  const url = URL.createObjectURL(image);
  return (
    <img
      src={url}
      alt="preview"
      className="w-full h-full object-contain max-w-full max-h-full"
      onLoad={() => URL.revokeObjectURL(url)}
    />
  );
}