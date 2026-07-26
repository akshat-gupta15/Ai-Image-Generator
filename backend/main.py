from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from image_generator import generate_image
import os

app = FastAPI()

os.makedirs("generated_images", exist_ok=True)

app.mount(
    "/generated_images",
    StaticFiles(directory="generated_images"),
    name="generated_images",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "AI Image Generator Backend Running"
    }

@app.post("/generate")
def generate(data: dict):
    prompt = data["prompt"]
    image = generate_image(prompt)

    return {
        "image": image
    }