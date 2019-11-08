import json

import numpy as np
from flask import Flask, jsonify, request, Response
import tensorflow as tf

app = Flask(__name__)


@app.route('/stock-app/api/v1.0/example', methods=["GET"])
def example_api():
    json = {"example": "json"}
    return jsonify(json)


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


@app.route('/stock-app/api/v1.0/predict', methods=["get"])
def predict_stocks():
    stocks, stock_dates = preprocess_data("./sample-stocks.json")
    data_mean = stocks.mean()
    data_std = stocks.std()
    stocks = (stocks - data_mean) / data_std
    model = tf.keras.models.load_model("C:\\Users\\Joshua Miller-Koren\\AppData\\Local\\Temp\\1")
    temp = [stocks]
    x_prev = np.array(temp)
    print(model)
    prediction = model.predict(x_prev)
    prediction = prediction * data_std + data_mean
    pred_list = prediction.tolist()
    json = {"stocks": pred_list}
    return jsonify(json)


if __name__ == '__main__':
    app.run()