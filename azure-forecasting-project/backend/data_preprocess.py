# backend/data_preprocess.py
import pandas as pd

# Load datasets
azure = pd.read_csv("../datasets/raw/azure_usage.csv")
external = pd.read_csv("../datasets/raw/external_factors.csv.csv")

# Convert date column to datetime
azure['date'] = pd.to_datetime(azure['date'])
external['date'] = pd.to_datetime(external['date'])

# Merge on date
merged = pd.merge(azure, external, on="date", how="left")

# Fill missing values
merged = merged.fillna(0)

# Save to processed folder
merged.to_csv("../datasets/processed/cleaned_merged.csv", index=False)

print("✅ cleaned_merged.csv created in datasets/processed/")
