import os
from dotenv import load_dotenv
from PIL import Image
import io
from typing import Optional
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables!")

client = genai.Client(api_key=GEMINI_API_KEY)

def generate_virtual_tryon(
    user_image_bytes: bytes,
    shirt_image_bytes: Optional[bytes],
    pants_image_bytes: Optional[bytes],
) -> bytes:
    """
    Generates a virtual try-on image using Gemini's multi-image prompt capability,
    based on the official Google AI documentation.
    """
    try:
        user_image = Image.open(io.BytesIO(user_image_bytes))
        
        # Start building the prompt with the user image
        contents = [user_image]
        
        prompt_parts = [
            "Create a professional, photorealistic fashion photo.",
            "Use the person from the first image as the model."
        ]

        # Add clothing images and update the prompt accordingly
        if shirt_image_bytes:
            shirt_image = Image.open(io.BytesIO(shirt_image_bytes))
            contents.append(shirt_image)
            prompt_parts.append("Take the shirt from the second image and place it on the model.")
        
        if pants_image_bytes:
            pants_image = Image.open(io.BytesIO(pants_image_bytes))
            contents.append(pants_image)
            # Adjust prompt based on whether a shirt was also present
            pants_prompt_index = "third" if shirt_image_bytes else "second"
            prompt_parts.append(f"Take the pants from the {pants_prompt_index} image and place them on the model.")

        prompt_parts.append("Generate a realistic, full-body shot of the person wearing the specified clothing. Ensure lighting, shadows, and fit are natural. Respond ONLY with the final image.")
        
        # Combine all parts into the final prompt text
        text_prompt = " ".join(prompt_parts)
        contents.append(text_prompt)

        # Generate content using the correct image model
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=contents,
        )

        # Extract the raw image data from the response
        image_data_parts = [
            part.inline_data.data
            for part in response.candidates[0].content.parts
            if part.inline_data
        ]

        if not image_data_parts:
            raise RuntimeError("Gemini response did not contain an image.")

        return image_data_parts[0]

    except Exception as e:
        # Re-raise with a clear message for the API endpoint to catch
        raise RuntimeError(f"Gemini virtual try-on failed: {e}")

# Keeping refine_prompt might still be useful for other features.
def refine_prompt(prompt: str) -> str:
    """
    Uses Gemini to refine a user prompt into a better image prompt.
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"Refine this prompt for photorealistic full-body fashion try-on generation:\n{prompt}",
        )
        return response.text or prompt
    except Exception:
        return prompt