import os
import requests
from dotenv import load_dotenv
import time


load_dotenv()

HF_API_KEY = os.getenv("HF_API_KEY")

def generate_image_with_hf(prompt: str, output_path: str = "output.png"):
    """
    Generate an image using a Hugging Face model (e.g. stable diffusion).
    Example model: "stabilityai/stable-diffusion-2"
    """
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}

    response = requests.post(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        headers=headers,
        json={"inputs": prompt},
    )

    if response.status_code == 200:
        image_bytes = response.content
        with open(output_path, "wb") as f:
            f.write(image_bytes)
        return output_path
    else:
        raise Exception(f"Hugging Face API error: {response.text}")

def generate_image_bytes_with_hf(prompt: str, model: str = "runwayml/stable-diffusion-v1-5") -> bytes:
    """
    Text-to-image via Hugging Face Inference API. Returns raw image bytes.
    Retries on 503 (model loading) and handles common auth errors clearly.
    """
    if not HF_API_KEY:
        raise Exception("HF_API_KEY is missing. Set it in backend/.env")

    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    url = f"https://api-inference.huggingface.co/models/{model}"

    for attempt in range(5):
        resp = requests.post(url, headers=headers, json={"inputs": prompt}, timeout=120)

        if resp.status_code == 200 and resp.content:
            return resp.content

        if resp.status_code == 503:
            # Model loading; wait and retry
            wait = min(2 + attempt * 2, 10)
            time.sleep(wait)
            continue

        if resp.status_code in (401, 403):
            raise Exception("Hugging Face auth failed. Check HF_API_KEY or model permissions.")

        # Surface raw error text for visibility
        try:
            raise Exception(f"Hugging Face error {resp.status_code}: {resp.text}")
        finally:
            pass

    raise Exception("Hugging Face model is still loading after retries. Please try again.")