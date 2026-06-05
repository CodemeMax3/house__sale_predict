from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib

app = Flask(__name__)

# Load model and feature columns
model = joblib.load("house_price_model.pkl")
feature_columns = joblib.load("feature_columns.pkl")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "model_loaded": True
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.get_json()

        # Create all columns with default value 0
        input_data = {col: 0 for col in feature_columns}

        # Numerical Features
        input_data["OverallQual"] = float(data["OverallQual"])
        input_data["YearBuilt"] = float(data["YearBuilt"])
        input_data["YearRemodAdd"] = float(data["YearRemodAdd"])
        input_data["TotalBsmtSF"] = float(data["TotalBsmtSF"])
        input_data["1stFlrSF"] = float(data["1stFlrSF"])
        input_data["GrLivArea"] = float(data["GrLivArea"])
        input_data["FullBath"] = float(data["FullBath"])
        input_data["TotRmsAbvGrd"] = float(data["TotRmsAbvGrd"])
        input_data["GarageCars"] = float(data["GarageCars"])
        input_data["GarageArea"] = float(data["GarageArea"])

        # One Hot Encoding

        mszoning = data["MSZoning"]
        bldgtype = data["BldgType"]
        heating = data["Heating"]
        kitchenqual = data["KitchenQual"]
        salecondition = data["SaleCondition"]
        landslope = data["LandSlope"]
        utilities = data["Utilities"]

        if f"MSZoning_{mszoning}" in input_data:
            input_data[f"MSZoning_{mszoning}"] = 1

        if f"BldgType_{bldgtype}" in input_data:
            input_data[f"BldgType_{bldgtype}"] = 1

        if f"Heating_{heating}" in input_data:
            input_data[f"Heating_{heating}"] = 1

        if f"KitchenQual_{kitchenqual}" in input_data:
            input_data[f"KitchenQual_{kitchenqual}"] = 1

        if f"SaleCondition_{salecondition}" in input_data:
            input_data[f"SaleCondition_{salecondition}"] = 1

        if f"LandSlope_{landslope}" in input_data:
            input_data[f"LandSlope_{landslope}"] = 1

        if f"Utilities_{utilities}" in input_data:
            input_data[f"Utilities_{utilities}"] = 1

        # Convert to DataFrame
        df = pd.DataFrame([input_data])

        # Predict
        prediction = model.predict(df)[0]

        return jsonify({
           "prediction": float(prediction)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)