import os
import uuid
import requests
from urllib.parse import quote


def generate_image(prompt):
    prompt = quote(prompt)

    image_url = f"https://image.pollinations.ai/prompt/{prompt}"

    image = requests.get(image_url, timeout=120)

    if image.status_code != 200:
        raise Exception("Image generation failed")

    filename = f"{uuid.uuid4()}.png"
    filepath = os.path.join("generated_images", filename)

    with open(filepath, "wb") as f:
        f.write(image.content)

    return filename