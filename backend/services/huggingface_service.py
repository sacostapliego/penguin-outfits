import requests

def generate_image(prompt, image_path):
    model_url = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    data = {"inputs": f"{prompt}, realistic clothing try-on"}
    response = requests.post(model_url, headers=headers, json=data)
    return response.content
