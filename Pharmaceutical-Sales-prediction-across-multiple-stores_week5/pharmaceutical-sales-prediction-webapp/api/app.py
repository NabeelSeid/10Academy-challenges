import os
import io
import random
import redis
from flask import Flask, request, jsonify, render_template, abort, Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import pandas as pd
# allow cross domain
# from flask_cors import CORS
import json
import sys
import time
import pickle
# port = 8080

app = Flask(__name__, static_folder='../build', static_url_path='/')
db = redis.from_url(os.environ['REDISCLOUD_URL'])
# CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

model = pickle.load(open('./model.pkl', 'rb'))
forecast = pd.read_csv("./forecast.csv", parse_dates =['ds'])

# @app.route('/')
# def home():
#     return render_template('index.html')
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # if request.method == 'POST':
    weeks = request.form.get('weeks')
    print(weeks)
    future_dates = model.make_future_dataframe(periods=int(weeks) * 7)
    forecast = model.predict(future_dates)

    forecast.to_csv('forecast.csv', encoding='utf-8', index=False)
    print(forecast.shape)
    
    return Response(forecast.to_json(orient="records"), mimetype='application/json')
    # return {'time': time.time()}


@app.route('/plot')
def plot():
    df = pd.read_csv("./forecast.csv", parse_dates =['ds'])

    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    model.plot(df, ax=axis)
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.run(debug=True)
