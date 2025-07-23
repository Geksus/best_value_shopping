from flask import Flask, jsonify, send_file
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import json
from datetime import datetime
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
        "origins": "http://localhost:5173",
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
    url = 'https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products'
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
        print(f"Error fetching offset {offset}: {e}")
        return []

@app.route('/')
def hello():
    print('App is running')

    last_item = Item.query.first()
    if last_item and last_item.added_at and last_item.added_at.date() == datetime.now().date():
        return jsonify({'message': 'No new items'})

    print("Fetching total item count...")
    initial = requests.get(
        'https://sf-ecom-api.silpo.ua/v1/uk/branches/1edb7347-7866-6c42-b1d6-11a6c487168c/products',
        params={
            "limit": 1,
            "deliveryType": "SelfPickup",
            "sortBy": "popularity",
            "sortDirection": "desc",
            "mustHavePromotion": "false",
            "inStock": "true",
            "offset": 0
        }
    )
    total = initial.json().get('total', 0)
    offsets = range(0, int(total), 100)
    print(f"Total items to fetch: {total}, pages: {len(offsets)}")

    items = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_page, offset): offset for offset in offsets}
        for future in as_completed(futures):
            batch = future.result()
            items.extend(batch)
            print(f"Fetched batch of {len(batch)} items, total so far: {len(items)}")

    print("Deleting old items...")
    Item.query.delete()
    db.session.commit()

    print("Preparing new items...")
    current_time = datetime.now()
    item_fields = {col.name for col in db.Model.metadata.tables[Item.__tablename__].columns}
    unique_ids = set()
    new_items = []

    for i, item in enumerate(items, 1):
        item_id = item.get('id')
        if not item_id or item_id in unique_ids:
            continue
        unique_ids.add(item_id)

        filtered = {
            k: item.get(k) if k not in ['promotions', 'specialPrices', 'modifier'] else json.dumps(item.get(k))
            for k in item_fields
        }
        filtered['added_at'] = current_time
        new_items.append(Item(**filtered))

        if i % 500 == 0:
            print(f"Processed {i} items...")

    print(f"Inserting {len(new_items)} unique items...")
    db.session.bulk_save_objects(new_items)
    db.session.commit()

    print("Process finished")
    return jsonify({'message': f'{len(new_items)} unique items processed and stored.'})

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Item.query.with_entities(Item.sectionSlug).distinct().order_by(Item.sectionSlug).all()
    return jsonify([cat[0] for cat in categories])

if __name__ == '__main__':
    app.run()
