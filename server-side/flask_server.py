from IPython.display import display
from flask import Flask, jsonify, request as req
import pickle
import sklearn
import os
from dotenv import dotenv_values

import pandas as pd
import flask_cors


config = dotenv_values("server-side/.env")
# print("config", config)
# model_file_path = os.getcwd() + "\\rf_model_financial_fraud_detection.pkl"

app = Flask(__name__)
flask_cors.CORS(
    app,
    origins=["http://localhost:8080", "http://localhost:3000"],
    supports_credentials=True,
)

# flask_cors.cross_origin()

model_file = open(
    config["MODEL_FILE_PATH"],
    "rb",
)
model = pickle.load(model_file)

# print("prediction", prediction)


@app.route("/flask", methods=["GET"])
# @cross_origin()
def index():
    return "Flask server"


# 22	133722.05	0.0	1295094.74	-133722.05	0.00	True	False


@app.route("/ml_query", methods=["POST"])
# @cross_origin()
def predict():
    # try:
    prediction = "default"
    print(req.data)
    data = req.json["data"]
    print("data, ", data)
    # prediction = model.predict(req.json["data"])
    typed_data = []
    for record in data:
        typed_data.append([])
        typed_data[-1].append(int(record[0]))
        typed_data[-1].append(float(record[1]))
        typed_data[-1].append(float(record[2]))
        typed_data[-1].append(float(record[3]))
        typed_data[-1].append(float(record[4]))
        typed_data[-1].append(float(record[5]))
        typed_data[-1].append(record[6])
        typed_data[-1].append(record[7])
    print("typed data ,", typed_data)
    df = pd.DataFrame(typed_data)
    df.columns = [
        "step",
        "amount",
        "oldbalanceOrg",
        "oldbalanceDest",
        "origBalance_inacc",
        "destBalance_inacc",
        "type_CASH_OUT",
        "type_TRANSFER",
    ]
    display(df)
    prediction = model.predict(df)
    prediction = [str(val == True).lower() for val in model.predict(df)]
    print("prediction ,", prediction)
    result = jsonify(list(prediction))
    print(result)

    # except Exception as e:
    #     print(e)

    return result
    # return jsonify({"result": list(prediction)})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
