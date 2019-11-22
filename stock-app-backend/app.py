import json
import numpy as np
from flask import Flask, jsonify, request, Response
import tensorflow as tf


app = Flask(__name__)


model = tf.keras.models.load_model("./1")


@app.route('/stock-app/api/v1.0/calculate', methods=["POST"])
def calculate():
    response = Response()
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    response.data = request.data
    return response


def preprocess_data(path):
    file = open(path, "r")
    dates = []
    stock_price = []
    temp = []
    data = json.load(file)
    for key in data:
        dates.append(key)
        temp.append(float(data[key]["2. high"]))
        temp.append(float(data[key]["1. open"]))
        temp.append(float(data[key]["3. low"]))
        temp.append(float(data[key]["4. close"]))
        stock_price.append(temp)
        temp = []
    return np.array(stock_price), np.array(dates)


@app.route('/stock-app/api/v1.0/predict', methods=["post"])
def predict_stocks():
    stock = request.data
    stocks, stock_dates = preprocess_data("./sample-stocks.json")
    response = enable_cors()
    temp = [stocks]
    x_prev = np.array(temp)
    prediction = model.predict(x_prev)
    pred_list = prediction[0].tolist()
    pred_dict = {"stocks": pred_list}
    resp_data = json.dumps(pred_dict)
    response.data = resp_data
    return response


def enable_cors():
    response = Response()
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run()
