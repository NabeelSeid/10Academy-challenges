from flask import Flask, request, jsonify, render_template
# allow cross domain
import pickle

app = Flask(__name__)
# CORS(app)
model = pickle.load(open('../model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    days = 0
    if request.method == 'POST':
        days = request.form.get('Days')

        future_dates = model.make_future_dataframe(periods = int(days) * 7)
        forecast = model.predict(future_dates)
        print(forecast)
        
    return render_template('index.html', predict_text=days)

# @app.route()

if __name__ == "__main__":
    app.run(debug=True)