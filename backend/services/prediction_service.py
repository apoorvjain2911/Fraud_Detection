import joblib
import pandas as pd

model = joblib.load("model/mule_account_detector.pkl")


def predict_account(data: dict):
    df = pd.DataFrame([data])

    probability = model.predict_proba(df)[0][1]

    risk_score = round(probability * 100)

    if risk_score <= 30:
        risk_level = "Low"
    elif risk_score <= 60:
        risk_level = "Medium"
    elif risk_score <= 80:
        risk_level = "High"
    else:
        risk_level = "Critical"

    return {
        "probability": float(probability),
        "risk_score": int(risk_score),
        "risk_level": risk_level
    }


def predict_csv(df):
    probabilities = model.predict_proba(df)[:, 1]

    risk_scores = (probabilities * 100).round()

    risk_levels = []

    for score in risk_scores:
        if score <= 30:
            risk_levels.append("Low")
        elif score <= 60:
            risk_levels.append("Medium")
        elif score <= 80:
            risk_levels.append("High")
        else:
            risk_levels.append("Critical")

    result_df = pd.DataFrame({
        "account_id": range(1, len(df) + 1),
        "risk_probability": probabilities,
        "risk_score": risk_scores,
        "risk_level": risk_levels
    })

    return result_df