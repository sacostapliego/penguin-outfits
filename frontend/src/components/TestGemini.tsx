import { useState } from "react";

export default function TestGemini() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("model", "gemini"); // or "huggingface"

      const res = await fetch("http://127.0.0.1:8000/api/images/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setResult(`Image saved at: ${data.image_path}`);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter outfit description"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Image
        </button>
      </form>

      {result && <p className="mt-4">{result}</p>}
    </div>
  );
}
