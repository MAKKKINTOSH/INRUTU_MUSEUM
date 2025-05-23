from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api import halls, artifacts, historical_figures, images
import os

app = FastAPI(title="Museum API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
os.makedirs("static/images", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(halls.router, prefix="/api/halls", tags=["halls"])
app.include_router(artifacts.router, prefix="/api/artifacts", tags=["artifacts"])
app.include_router(historical_figures.router, prefix="/api/historical-figures", tags=["historical-figures"])
app.include_router(images.router, prefix="/api/images", tags=["images"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Museum API"} 