from fastapi import APIRouter, UploadFile, File
import pandas as pd

from services.prediction_service import (
    predict_account,
    predict_csv
)

router = APIRouter()


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    results = predict_csv(df)

    return results.to_dict(orient="records")

@router.post("/summary")
async def summary(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    results = predict_csv(df)

    return {
        "total_accounts": len(results),
        "critical_accounts": int((results["risk_level"] == "Critical").sum()),
        "high_accounts": int((results["risk_level"] == "High").sum()),
        "medium_accounts": int((results["risk_level"] == "Medium").sum()),
        "low_accounts": int((results["risk_level"] == "Low").sum())
    }

@router.post("/predict")
def predict(data: dict):
    return predict_account(data)