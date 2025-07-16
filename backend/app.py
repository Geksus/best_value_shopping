from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://username:password@localhost:3306/database_name'
db = SQLAlchemy(app)

@app.route('/api/hello')
def hello():
    data = requests.get('https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products?limit=100&deliveryType=DeliveryHome&sortBy=popularity&sortDirection=desc&mustHavePromotion=false&inStock=true&offset=0')
    json_data = data.json()
    total = json_data.get('total')
    items = []
    for i in range(0, 20000, 100):
        data = requests.get(f'https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products?limit=100&deliveryType=DeliveryHome&sortBy=popularity&sortDirection=desc&mustHavePromotion=false&inStock=true&offset={i}')
        json_data = data.json()
        items.extend(json_data.get('items'))
    return items

if __name__ == '__main__':
    app.run(debug=True)