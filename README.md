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

Dashboard
<img width="1902" height="913" alt="image" src="https://github.com/user-attachments/assets/615832c7-7b34-4352-bde5-fe10981978c3" />


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
