# 🏠 House Price Prediction using Machine Learning

## 📌 Project Overview

This project predicts house prices based on various property features using Machine Learning techniques. The model is trained on the Ames Housing Dataset and deployed as a web application using Flask, HTML, CSS, and JavaScript.

The goal is to provide users with an estimated house price by entering property details through a user-friendly web interface.

---

## 🚀 Features

* Predicts house prices based on house characteristics
* Data preprocessing and feature engineering
* One-Hot Encoding for categorical variables
* Model comparison using multiple algorithms
* Cross-validation for model evaluation
* Flask API backend
* Interactive web interface
* Real-time price prediction

---

## 📊 Dataset

The project uses the **Ames Housing Dataset**, which contains detailed information about residential properties.

### Example Features

* Overall Quality
* Year Built
* Year Remodeled
* Total Basement Area
* First Floor Area
* Living Area
* Number of Bathrooms
* Total Rooms
* Garage Cars
* Garage Area
* MS Zoning
* Building Type
* Heating Type
* Kitchen Quality
* Sale Condition
* Land Slope

---

## 🛠️ Technologies Used

### Programming Language

* Python

### Libraries

* Pandas
* NumPy
* Scikit-Learn
* Joblib
* Flask

### Frontend

* HTML
* CSS
* JavaScript

### Development Tools

* Jupyter Notebook
* VS Code
* Git & GitHub
* Postman

---

## 📈 Machine Learning Workflow

### 1. Data Collection

* Load training dataset
* Explore features and target variable

### 2. Data Preprocessing

* Handle missing values
* Encode categorical variables
* Feature selection
* Data transformation

### 3. Model Training

Multiple models were evaluated:

* Linear Regression
* Random Forest Regressor
* Gradient Boosting Regressor

### 4. Model Evaluation

Models were compared using:

* R² Score
* Mean Absolute Error (MAE)
* Root Mean Squared Error (RMSE)
* Cross Validation

### 5. Model Selection

The best-performing model was selected and saved using Joblib.

---

## 🌐 Web Application

Users can enter house details through a web form.

### Input Fields

* Overall Quality
* Year Built
* Year Remodeled
* Basement Area
* First Floor Area
* Living Area
* Bathrooms
* Total Rooms
* Garage Cars
* Garage Area
* Zoning Type
* Building Type
* Heating Type
* Kitchen Quality
* Sale Condition
* Land Slope

### Output

```text
Predicted House Price: $345,632
```

---

## 📂 Project Structure

```text
house_price_predictor/
│
├── app.py
├── house_price_model.pkl
├── feature_columns.pkl
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── train.csv
├── test.csv
│
├── house-price-advanced-regression.ipynb
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/house-price-predictor.git
```

### Navigate to Project Folder

```bash
cd house-price-predictor
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Application

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

---

## 📋 API Endpoint

### Health Check

```http
GET /health
```

### Prediction

```http
POST /predict
```

Example JSON:

```json
{
    "OverallQual": 7,
    "YearBuilt": 2005,
    "YearRemodAdd": 2005,
    "TotalBsmtSF": 1000,
    "1stFlrSF": 1200,
    "GrLivArea": 1800,
    "FullBath": 2,
    "TotRmsAbvGrd": 8,
    "GarageCars": 2,
    "GarageArea": 500
}
```

---

## 🎯 Results

* Successfully trained and deployed a machine learning model for house price prediction.
* Implemented data preprocessing and feature engineering techniques.
* Developed a Flask-based web application for real-time predictions.
* Integrated machine learning model with frontend and backend components.

---

## 🔮 Future Enhancements

* Deploy application on Render or Railway
* Add prediction history
* Improve UI/UX
* Add data visualization dashboards
* Support multiple house datasets
* Implement advanced ensemble models

---

## 👨‍💻 Author

**Sobin Sinu**

Machine Learning & Software Development Enthusiast

GitHub: [https://github.com/CodemeMax3](https://github.com/CodemeMax3)
