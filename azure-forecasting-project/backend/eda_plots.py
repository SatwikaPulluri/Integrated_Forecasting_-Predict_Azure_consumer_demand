import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# Load feature engineered dataset
df = pd.read_csv("../datasets/processed/feature_engineered.csv")
df['date'] = pd.to_datetime(df['date'])

# Create output folder for plots
output_dir = "../datasets/plots"
os.makedirs(output_dir, exist_ok=True)

# 1. Heatmap of correlations
plt.figure(figsize=(10,6))
sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")
plt.title("Feature Correlation Heatmap")
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "heatmap_correlation.png"))
plt.close()

# 2. CPU Usage Trend
plt.figure(figsize=(12,6))
sns.lineplot(x="date", y="usage_cpu", data=df)
plt.title("CPU Usage Over Time")
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "cpu_usage_trend.png"))
plt.close()

# 3. Boxplot by Day of Week
plt.figure(figsize=(8,5))
sns.boxplot(x="day_of_week", y="usage_cpu", data=df)
plt.title("CPU Usage by Day of Week")
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "boxplot_dayofweek.png"))
plt.close()

# 4. Rolling Average (30-day)
plt.figure(figsize=(12,6))
sns.lineplot(x="date", y="rolling_mean_30", data=df, label="30-day Avg")
sns.lineplot(x="date", y="usage_cpu", data=df, alpha=0.5, label="Daily Usage")
plt.legend()
plt.title("CPU Usage with 30-day Rolling Average")
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "rolling_avg.png"))
plt.close()

# 5. Histogram of CPU Usage
plt.figure(figsize=(8,5))
sns.histplot(df['usage_cpu'], bins=30, kde=True)
plt.title("CPU Usage Distribution")
plt.tight_layout()
plt.savefig(os.path.join(output_dir, "cpu_usage_histogram.png"))
plt.close()

print(f"✅ All plots saved in: {output_dir}")
