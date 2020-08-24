import io
from flask import Flask, request, jsonify, render_template, abort, Response
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import pandas as pd
import json
import sys
import pickle

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.config['CORS_HEADERS'] = 'Content-Type'

# loading models
model_1 = pickle.load(open('./23-08-2020-20-53-02-store_1.pkl', 'rb'))
model_a = pickle.load(open('./23-08-2020-20-08-56-type_a.pkl', 'rb'))
model_b = pickle.load(open('./23-08-2020-20-12-34-type_b.pkl', 'rb'))
model_c = pickle.load(open('./23-08-2020-20-16-17-type_c.pkl', 'rb'))
model_d = pickle.load(open('./23-08-2020-20-20-00-type_d.pkl', 'rb'))

# loading cached forecasts
forecast_1 = pd.read_csv("./store_1.csv", parse_dates=['ds'])
forecast_a = pd.read_csv("./type_a.csv", parse_dates=['ds'])
forecast_b = pd.read_csv("./type_b.csv", parse_dates=['ds'])
forecast_c = pd.read_csv("./type_c.csv", parse_dates=['ds'])
forecast_d = pd.read_csv("./type_d.csv", parse_dates=['ds'])


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/cached')
def cached():
    cached_response = {
        'forecast1': forecast_1[
            ['ds', 'trend', 'yhat', 'yhat_lower', 'yhat_upper', 'weekly', 'yearly']].tail(42).to_json(orient="records"),
        'forecastA': forecast_a[
            ['ds', 'trend', 'yhat', 'yhat_lower', 'yhat_upper', 'weekly', 'yearly']].tail(42).to_json(orient="records"),
        'forecastB': forecast_b[
            ['ds', 'trend', 'yhat', 'yhat_lower', 'yhat_upper', 'weekly', 'yearly']].tail(42).to_json(orient="records"),
        'forecastC': forecast_c[
            ['ds', 'trend', 'yhat', 'yhat_lower', 'yhat_upper', 'weekly', 'yearly']].tail(42).to_json(orient="records"),
        'forecastD': forecast_d[
            ['ds', 'trend', 'yhat', 'yhat_lower', 'yhat_upper', 'weekly', 'yearly']].tail(42).to_json(orient="records")
    }
    return cached_response


@app.route('/predict', methods=['POST'])
def predict():
    # if request.method == 'POST':
    weeks = request.form.get('weeks')
    print(weeks)
    future_dates = model_1.make_future_dataframe(periods=int(weeks) * 7)
    forecast = model_1.predict(future_dates)

    forecast.to_csv('forecast.csv', encoding='utf-8', index=False)
    print(forecast.shape)

    return Response(forecast.to_json(orient="records"), mimetype='application/json')
    # return {'time': time.time()}


@app.route('/api/plot/<store>/<variable>')
def plot(store, variable):
    # choose model and forecast to plot sales on from url parameter
    model, data = model_forecast(store)

    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)

    # model.plot(data, ax=axis)
    plot_on_variable(variable, model, data, axis)
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')


def model_forecast(store):
    if(store == 'store1'):
        return model_1, forecast_1
    if(store == 'storeA'):
        return model_a, forecast_a
    if(store == 'storeB'):
        return model_b, forecast_b
    if(store == 'storeC'):
        return model_c, forecast_c
    if(store == 'storeD'):
        return model_d, forecast_d


def plot_on_variable(variable, model, data, ax):
    if(variable == 'sales'):
        model.plot(data, ax=ax)
    if(variable == 'trend'):
        ax1 = data.groupby('ds').agg({'trend': 'sum'}).trend.plot(ax=ax)
        ax1.set_xlabel("date")
        ax1.set_ylabel("trand")
    if(variable == 'holiday'):
        ax1 = data.groupby('ds').agg(
            {'holidays': 'sum'}).holidays.plot(ax=ax)
        ax1.set_xlabel("date")
        ax1.set_ylabel("holidays")
    if(variable == 'weekly'):
        data['weekOfDay'] = data.set_index('ds').index.dayofweek
        days = ['Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday', 'Sunday']
        forecast2 = data.groupby('weekOfDay').agg({'weekly': 'mean'})
        forecast2.index = days
        ax1 = forecast2.plot(ax=ax)
        ax1.set_xlabel("date")
        ax1.set_ylabel("Day of week")
    if(variable == 'yearly'):
        ax1 = data.groupby('ds').agg({'yearly': 'sum'}).yearly.plot(ax=ax)
        ax1.set_xlabel("date")
        ax1.set_ylabel("yearly")


if __name__ == "__main__":
    app.run(debug=True)
