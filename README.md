# Azure Demand Forecasting & Capacity Optimization System

## 📌 Project Overview
The **Azure Demand Forecasting & Capacity Optimization System** is a platform designed to forecast CPU and resource usage across regions and optimize cloud capacity planning. It integrates machine learning, backend APIs, and an interactive frontend dashboard to deliver accurate predictions and insights.

---

## 🎯 Problem Statement
Enterprises face challenges predicting future CPU and resource usage, leading to:
- **Over-provisioning** — increased costs.
- **Under-provisioning** — reduced performance.

**Goal:**  
Predict Azure resource usage accurately and optimize capacity planning.

---

## 🛠 Objectives
- Predict Azure resource usage (CPU, memory, storage).
- Visualize performance trends and patterns.
- Optimize cost through accurate capacity planning.
- Build an interactive user-friendly dashboard.

---

## 📂 Project Architecture
**Flow:**  

**Components:**
- **Frontend:** ReactJS with Chart.js.
- **Backend:** Flask API serving model predictions.
- **Database:** SQLite / PostgreSQL.
- **Machine Learning:** Python (pandas, numpy, scikit-learn).

---

## 🛠 Tech Stack
| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | ReactJS, Chart.js      |
| Backend   | Python, Flask          |
| Database  | SQLite / PostgreSQL    |
| Libraries | pandas, numpy, scikit-learn |
| Tools     | Postman, VS Code       |

---

## 🚀 Features
- Interactive dashboard with CPU & storage forecasts.
- Region-wise capacity optimization recommendations.
- Visualizations for faster decision-making.
- REST API endpoints for model integration.

---

## 📌 Milestones
| Milestone | Description                                  |
|-----------|----------------------------------------------|
| M1        | Data preprocessing & feature engineering   |
| M2        | Model development & training                |
| M3        | Model integration with backend              |
| M4        | Frontend dashboard & deployment             |

---

## 🖼 Screenshots / Outputs

## Dashboard
<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/615832c7-7b34-4352-bde5-fe10981978c3" />

## Usage Trends
<img width="1887" height="897" alt="image" src="https://github.com/user-attachments/assets/780d75f7-9af0-4bec-9886-670248c50e71" />

## Storage
<img width="1868" height="905" alt="image" src="https://github.com/user-attachments/assets/dd5a3972-80d2-43b4-a916-be51a0c20a94" />

## Forecast
<img width="1885" height="905" alt="image" src="https://github.com/user-attachments/assets/39d47ab0-763c-4c48-8029-9d62ac827418" />

## Features
<img width="1892" height="892" alt="image" src="https://github.com/user-attachments/assets/a502e39d-c86e-4744-9c3d-e3fec0d3ce36" />

## Insights
<img width="1376" height="893" alt="image" src="https://github.com/user-attachments/assets/358838f7-86d6-442f-b71a-6374b734e9ee" />

## Reports
<img width="1900" height="907" alt="image" src="https://github.com/user-attachments/assets/feedf991-29e2-4eb3-a38b-6e100539d9f7" />

<img width="1780" height="907" alt="image" src="https://github.com/user-attachments/assets/39052396-99d8-4b9c-9360-9e86d0ff124b" />

## Model Comparisions
<img width="1877" height="912" alt="image" src="https://github.com/user-attachments/assets/c95ad382-f593-4cee-bc46-88b309c2bb5e" />

## EDA Visuals
<img width="1871" height="887" alt="image" src="https://github.com/user-attachments/assets/320e44e4-3e2c-40fd-9b38-1a4418dcd3c9" />
<img width="1897" height="888" alt="image" src="https://github.com/user-attachments/assets/32735f7a-f3d9-4408-b878-0514a0dfd885" />
<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/2c441b27-f33d-4543-9f67-c61605897735" />
<img width="800" height="500" alt="image" src="https://github.com/user-attachments/assets/7a62cf37-d7d2-4318-b693-3e3eff61d0b8" />
<img width="1200" height="600" alt="image" src="https://github.com/user-attachments/assets/057dee59-3621-4f73-88cd-3bbd80f77c58" />




---

## 📌 Setup & Installation

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python app.py
