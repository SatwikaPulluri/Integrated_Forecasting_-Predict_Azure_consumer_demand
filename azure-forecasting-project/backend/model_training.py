import os
import pandas as pd
import numpy as np
import json, pickle
from sklearn.metrics import mean_absolute_error, mean_squared_error
from statsmodels.tsa.arima.model import ARIMA
from xgboost import XGBRegressor

# ------------------------
# Load dataset
# ------------------------
base_dir = os.path.dirname(__file__)
file_path = os.path.join(base_dir, "..", "datasets", "processed", "feature_engineered.csv")
df = pd.read_csv(file_path)
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values("date")

# Target variable
y = df['usage_cpu'].values

# Features (drop date + target)
X = df.drop(columns=['date','usage_cpu']).fillna(0)

# Encode categorical features
X = pd.get_dummies(X).values

# ------------------------
# Train / Val / Test Split
# ------------------------
n = len(df)
train_size = int(n*0.7)
val_size = int(n*0.2)

train_X, val_X, test_X = X[:train_size], X[train_size:train_size+val_size], X[train_size+val_size:]
train_y, val_y, test_y = y[:train_size], y[train_size:train_size+val_size], y[train_size+val_size:]

metrics = {}
os.makedirs(os.path.join(base_dir,"saved_models"), exist_ok=True)

# ------------------------
# Model 1: ARIMA
# ------------------------
try:
    arima = ARIMA(train_y, order=(2,1,2)).fit()
    preds = arima.forecast(len(test_y))
    mae = mean_absolute_error(test_y, preds)
    rmse = np.sqrt(mean_squared_error(test_y, preds))
    mape = np.mean(np.abs((test_y - preds) / test_y)) * 100
    metrics["ARIMA"] = {"MAE": mae, "RMSE": rmse, "MAPE": mape}
    with open(os.path.join(base_dir,"saved_models","arima.pkl"),"wb") as f:
        pickle.dump(arima,f)
except Exception as e:
    metrics["ARIMA"] = {"error": str(e)}

# ------------------------
# Model 2: XGBoost
# ------------------------
try:
    xgb = XGBRegressor(n_estimators=100)
    xgb.fit(train_X, train_y)
    preds = xgb.predict(test_X)
    mae = mean_absolute_error(test_y, preds)
    rmse = np.sqrt(mean_squared_error(test_y, preds))
    mape = np.mean(np.abs((test_y - preds) / test_y)) * 100
    metrics["XGBoost"] = {"MAE": mae, "RMSE": rmse, "MAPE": mape}
    with open(os.path.join(base_dir,"saved_models","xgb.pkl"),"wb") as f:
        pickle.dump(xgb,f)
except Exception as e:
    metrics["XGBoost"] = {"error": str(e)}

# ------------------------
# Save metrics JSON
# ------------------------
with open(os.path.join(base_dir,"saved_models","metrics.json"),"w") as f:
    json.dump(metrics,f, indent=2)

print("✅ Training complete. Metrics saved:", metrics)
