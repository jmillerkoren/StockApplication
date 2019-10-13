from flask import Flask, jsonify, request, Response
from predict import

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


if __name__ == '__main__':
    app.run()
