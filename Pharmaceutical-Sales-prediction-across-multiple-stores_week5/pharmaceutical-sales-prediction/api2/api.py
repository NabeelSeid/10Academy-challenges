from flask import Flask, request, jsonify, render_template
# allow cross domain
# from flask_cors import CORS
import json
import sys
import time
import pickle
# port = 8080

app = Flask(__name__)
# CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

model = pickle.load(open('./model.pkl', 'rb'))

# @app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        
        weeks = request.form.get('weeks')
        future_dates = model.make_future_dataframe(periods = int(weeks) * 7)
        forecast = model.predict(future_dates)
        # print(forecast)
        
    return json.dumps(forecast.to_json()), 200, {'Content-Type': 'text/plain; charset=utf-8'}

@app.route('/time')
def get_current_time():
    return {'time': time.time()}


if __name__ == "__main__":
    app.run(debug=True)