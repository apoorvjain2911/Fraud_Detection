from fastapi import FastAPI
from routes.predict import router as predict_router

app = FastAPI(
    title="Mule Account Detection API"
)

app.include_router(predict_router)


@app.get("/")
def home():
    return {
        "message": "Mule Account Detection API Running"
    }