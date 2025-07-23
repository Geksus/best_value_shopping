from flask import Flask, jsonify, send_file
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import json
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

import os

from models import Item
from db import db

load_dotenv()

user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')
img_url_prefix = os.getenv('IMG_URL_PREFIX')
img_folder_path = os.getenv('IMG_FOLDER_PATH')

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5173",  # Your React app's URL
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    },
    r"/products/300x300/webp/*": {
        "origins": "https://images.silpo.ua",
        "methods": ["GET"],
        "allow_headers": ["Content-Type"]
    }
})

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{user}:{password}@{host}:3306/{db_name}'

db.init_app(app)

def fetch_page(offset):
    url = f'https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products'
    params = {
        "limit": 100,
        "deliveryType": "SelfPickup",
        "sortBy": "popularity",
        "sortDirection": "desc",
        "mustHavePromotion": "false",
        "inStock": "true",
        "offset": offset
    }
    try:
        resp = requests.get(url, params=params, timeout=10)
        resp.raise_for_status()
        return resp.json().get('items', [])
    except Exception as e:
        print(f"Error at offset {offset}: {e}")
        return []

@app.route('/')
def hello():
    print('App is running')
    last_item = Item.query.first()
    if last_item is not None and last_item.added_at is not None:
        today = datetime.now().date()
        if last_item.added_at.date() == today:
            return jsonify({'message': 'No new items'})

    # Get all items from the database
    data = requests.get('https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products?limit=1&deliveryType=SelfPickup&sortBy=popularity&sortDirection=desc&mustHavePromotion=false&inStock=true&offset=0')
    json_data = data.json()
    total = json_data.get('total')
    items = []
    offsets = range(0, int(total), 100)

    print(f"Fetching {len(offsets)} pages in parallel...")
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_page, offset): offset for offset in offsets}
        for future in as_completed(futures):
            items_batch = future.result()
            items.extend(items_batch)
            print(f"Fetched batch, total items so far: {len(items)}")

    # Store items in the database
    Item.query.delete()
    db.session.commit()

    print('Starting to add items')
    current_time = datetime.now()
    count = 0

    for item in items:
        count += 1
        print(count)
        item_fields = None
        item_id = item.get('id')
        if item_id is not None:
            item_fields = {col.name for col in db.Model.metadata.tables[Item.__tablename__].columns}
        filtered_item = {k: item.get(k) if k not in ['promotions', 'specialPrices', 'modifier'] else json.dumps(item.get(k)) for k in item_fields}
        filtered_item['added_at'] = current_time

        existing = Item.query.get(filtered_item['id'])
        if existing is not None:
            print(f'Item {json.dumps(filtered_item)} already exists', json.dumps(existing.to_dict()))
            continue
        db.session.add(Item(**filtered_item))
    db.session.commit()

    print('Process finished')
    return jsonify({'message': f'{len(items)} items processed and stored.'})

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

if __name__ == '__main__':
    app.run(debug=True)