from flask import Flask, jsonify, request as req
import pickle
import sklearn
app = Flask(__name__)

model_file = open(r"C:\Users\AMAN2\OneDrive\Desktop\test_regr.pkl", "rb")
model = pickle.load(model_file)

# print("prediction", prediction)

@app.route('/flask', methods=['GET'])
def index():
    return "Flask server"

@app.route("/ml_query", methods=['POST'])
def prediction():
    prediction = model.predict(req.json["data"])
    print(req.json["data"])
    return jsonify({"result": list(prediction)})

if __name__ == "__main__":
    app.run(port=5001, debug=True)

