from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os, json, numpy as np
import pickle

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# -----------------
# Simple Home
# -----------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend is running ✅"})

# -----------------
# Usage Trends
# -----------------
@app.route("/api/usage-trends", methods=["GET"])
def usage_trends():
    data = [
        {"date": "2023-01-01", "usage_cpu": 899},
        {"date": "2023-01-02", "usage_cpu": 902},
        {"date": "2023-01-03", "usage_cpu": 918}
    ]
    return jsonify(data)

# -----------------
# Forecast CPU
# -----------------
@app.route("/api/forecast", methods=["GET"])
def forecast():
    try:
        base_dir = os.path.dirname(__file__)
        with open(os.path.join(base_dir,"saved_models","xgb.pkl"), "rb") as f:
            xgb = pickle.load(f)

        df = pd.read_csv(os.path.join(base_dir,"..","datasets","processed","feature_engineered.csv"))
        df = df.sort_values("date")
        X = df.drop(columns=['date','usage_cpu']).fillna(0)
        X = pd.get_dummies(X).values

        X_last = X[-7:]
        preds = xgb.predict(X_last)

        data = [{"date": str(df['date'].iloc[-7 + i]), "forecast_cpu": float(preds[i])} for i in range(len(preds))]
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# Feature Engineered Data
# -----------------
@app.route("/api/features", methods=["GET"])
def features():
    try:
        base_dir = os.path.dirname(__file__)
        file_path = os.path.join(base_dir, "..", "datasets", "processed", "feature_engineered.csv")

        df = pd.read_csv(file_path)
        df = df.replace([np.nan, np.inf, -np.inf, pd.NaT, pd.NA], None)

        records = df.to_dict(orient="records")
        safe_records = []
        for row in records:
            safe_row = {k: (None if v is None or v != v else v) for k, v in row.items()}
            safe_records.append(safe_row)

        return jsonify(safe_records)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# Insights
# -----------------
@app.route("/api/insights", methods=["GET"])
def insights():
    try:
        base_dir = os.path.dirname(__file__)
        file_path = os.path.join(base_dir, "..", "datasets", "processed", "feature_engineered.csv")

        df = pd.read_csv(file_path)
        df = df.replace([pd.NA, pd.NaT, float("inf"), float("-inf")], pd.NA)
        df = df.fillna(0)

        insights = {
            "peak_usage_date": str(df.loc[df['usage_cpu'].idxmax(), 'date']),
            "avg_cpu_utilization": round(df['cpu_utilization'].mean(), 2),
            "max_cpu": int(df['usage_cpu'].max()),
            "min_cpu": int(df['usage_cpu'].min())
        }
        return jsonify(insights)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# Model Metrics
# -----------------
@app.route("/api/model-metrics", methods=["GET"])
def model_metrics():
    try:
        base_dir = os.path.dirname(__file__)
        with open(os.path.join(base_dir,"saved_models","metrics.json")) as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# Model Comparison Table
# -----------------
@app.route("/api/model-comparison", methods=["GET"])
def model_comparison():
    try:
        base_dir = os.path.dirname(__file__)
        with open(os.path.join(base_dir,"saved_models","metrics.json")) as f:
            data = json.load(f)
        table = [{"model": m, **vals} for m,vals in data.items()]
        return jsonify(table)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# Reports Endpoint
# -----------------
@app.route("/api/reports", methods=["GET"])
def reports():
    try:
        base_dir = os.path.dirname(__file__)
        
        with open(os.path.join(base_dir, "saved_models", "metrics.json")) as f:
            metrics = json.load(f)

        with open(os.path.join(base_dir,"saved_models","xgb.pkl"), "rb") as f:
            xgb = pickle.load(f)

        df = pd.read_csv(os.path.join(base_dir,"..","datasets","processed","feature_engineered.csv"))
        df = df.sort_values("date")
        X = df.drop(columns=['date','usage_cpu']).fillna(0)
        X = pd.get_dummies(X).values
        X_last = X[-7:]
        preds = xgb.predict(X_last)

        forecast_max = max(preds)
        forecast_avg = sum(preds)/len(preds)

        threshold_high = 900
        threshold_medium = 700

        if forecast_max > threshold_high:
            capacity_recommendation = "⚠️ High forecasted CPU usage detected. Recommend scaling UP infrastructure."
        elif forecast_max > threshold_medium:
            capacity_recommendation = "📈 Moderate forecasted CPU usage. Monitor closely and prepare to scale."
        else:
            capacity_recommendation = "✅ CPU usage forecast stable. No immediate scaling needed."

        report = {
            "model_metrics": metrics,
            "capacity_insights": {
                "forecast_max_cpu": float(forecast_max),
                "forecast_avg_cpu": float(forecast_avg),
                "recommendation": capacity_recommendation
            }
        }
        return jsonify(report)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------
# EDA Plot Images Endpoint  ✅ NEW
# -----------------
@app.route("/api/plots/<filename>", methods=["GET"])
def get_plot_image(filename):
    base_dir = os.path.dirname(__file__)
    plots_dir = os.path.join(base_dir, "..", "datasets", "plots")
    return send_from_directory(plots_dir, filename)

# -----------------
# Run Flask
# -----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
