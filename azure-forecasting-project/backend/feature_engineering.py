import pandas as pd

# Load cleaned dataset from Milestone 1
df = pd.read_csv("../datasets/processed/cleaned_merged.csv")

# Ensure date column is datetime
df['date'] = pd.to_datetime(df['date'])
df = df.sort_values('date')

# -----------------------------
# 1. Time-based features
# -----------------------------
df['day_of_week'] = df['date'].dt.dayofweek
df['month'] = df['date'].dt.month
df['quarter'] = df['date'].dt.quarter
df['is_weekend'] = df['day_of_week'].isin([5,6]).astype(int)

# -----------------------------
# 2. Lag & Rolling features
# -----------------------------
df['cpu_usage_lag1'] = df['usage_cpu'].shift(1)
df['cpu_usage_lag3'] = df['usage_cpu'].shift(3)
df['cpu_usage_lag7'] = df['usage_cpu'].shift(7)

df['rolling_mean_7'] = df['usage_cpu'].rolling(7).mean()
df['rolling_max_7'] = df['usage_cpu'].rolling(7).max()
df['rolling_min_7'] = df['usage_cpu'].rolling(7).min()

df['rolling_mean_30'] = df['usage_cpu'].rolling(30).mean()
df['rolling_max_30'] = df['usage_cpu'].rolling(30).max()
df['rolling_min_30'] = df['usage_cpu'].rolling(30).min()

# -----------------------------
# 3. Derived metrics
# -----------------------------
df['cpu_utilization'] = df['usage_cpu'] / df['usage_cpu'].max()

if 'storage_used' in df.columns:
    df['max_storage'] = df.groupby('resource_id')['storage_used'].transform('max')
    df['storage_efficiency'] = df['storage_used'] / df['max_storage']

# -----------------------------
# 4. External factors
# -----------------------------
try:
    external = pd.read_csv("../datasets/raw/external_factors.csv")
    external['date'] = pd.to_datetime(external['date'])
    df = pd.merge(df, external, on="date", how="left")
except FileNotFoundError:
    print("⚠️ External factors not found, skipping merge.")

# Save feature engineered dataset
df.to_csv("../datasets/processed/feature_engineered.csv", index=False)
print("✅ feature_engineered.csv created in datasets/processed/")
