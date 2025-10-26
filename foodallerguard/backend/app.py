from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import cv2 as cv
import numpy as np
import pytesseract
import random

app = Flask(__name__)
CORS(app)

# Configure logging to file and console
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('backend.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

@app.before_request
def log_request_info():
    logger.info(f'{request.method} {request.path} - {request.remote_addr}')
    if request.is_json:
        logger.info(f'Body: {request.get_json()}')

# Get the directory of the current file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "frozen_east_text_detection.pb")

# Initialize the text detector only if the model file exists
textDetector = None
if os.path.exists(MODEL_PATH):
    textDetector = cv.dnn_TextDetectionModel_EAST(MODEL_PATH)
    textDetector.setNMSThreshold(0.4)
    textDetector.setConfidenceThreshold(0.8)
else:
    print(f"Warning: Model file not found at {MODEL_PATH}")

# ✅ Fake OCR Text Data (customize if needed)
MOCK_OCR_TEXT = """
    Crispy Fried Tilapia
    Southern Fried Catfish
    Tempura Haddock
    Asian-Style Fried Sole
    Spicy Fried Mahi Mahi
    Garden Salad
    Fries
    Buttercrust Wahoo
    Grilled Chicken
    Peanut Satay
    Crab Cakes
    Buffalo Wings
    Cheeseburger
    Mozzarella Sticks
    Caesar Salad
    Tofu Bowl
    Shrimp Tacos
    Clam Chowder
    Garlic Bread
    Spaghetti
"""

# ✅ Allergen Keyword Mapping
ALLERGEN_KEYWORDS = {
    "fish": ["fish", "tilapia", "catfish", "mahi", "sole", "snapper", "haddock", "wahoo"],
    "dairy": ["cheese", "milk", "cream", "butter", "buffalo"],
    "peanuts": ["peanut", "satay"],
    "eggs": ["egg", "caesar"],
    "soy": ["soy", "tofu"],
    "wheat": ["bread", "wrap", "flour", "wheat", "garlic bread", "spaghetti"],
    "shellfish": ["crab", "shrimp", "lobster", "clam"],
    "sesame": ["sesame"],
    "nuts": ["peanut", "almond", "cashew", "walnut"],
}

# Load allergens data
def load_allergens():
    try:
        with open('allergens.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

@app.route("/", methods=["GET"])
def home_page():
    """API Information"""
    return jsonify({
        "message": "FoodAllerGuard API",
        "endpoints": [
            "/api/health - Health check",
            "/api/allergens - Get available allergens",
            "/api/check - Check ingredients for allergens"
        ]
    })

@app.route("/camera", methods=["GET"])
def camera_page():
    """Camera access for scanning"""
    if textDetector is None:
        return jsonify({"error": "Text detection model not available"}), 503
    
    try:
        # Check camera access
        camera = cv.VideoCapture(0)
        if not camera.isOpened():
            return jsonify({"error": "Camera cannot be opened"}), 500
        
        ret, frame = camera.read()
        camera.release()
        
        if not ret:
            return jsonify({"error": "Unable to receive frame"}), 500
        
        return jsonify({"status": "Camera is ready"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/allergens', methods=['GET'])
def get_allergens():
    """Get list of all available allergens"""
    allergens = load_allergens()
    return jsonify(list(allergens.keys()))

@app.route('/api/check', methods=['POST'])
def check_ingredients():
    """Check ingredients against user's allergens"""
    data = request.get_json()
    user_allergens = data.get('allergens', [])
    ingredients = data.get('ingredients', [])
    
    allergens_db = load_allergens()
    found_allergens = []
    
    for ingredient in ingredients:
        ingredient_lower = ingredient.lower()
        for allergen in user_allergens:
            if allergen in allergens_db:
                allergen_ingredients = allergens_db[allergen]
                for allergen_ingredient in allergen_ingredients:
                    if allergen_ingredient.lower() in ingredient_lower:
                        found_allergens.append({
                            'allergen': allergen,
                            'ingredient': ingredient,
                            'matched_term': allergen_ingredient
                        })
    
    return jsonify({
        'safe': len(found_allergens) == 0,
        'found_allergens': found_allergens
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'})

@app.route('/api/scan', methods=['POST'])
@app.route('/scan', methods=['POST'])
def scan_menu():
    """Scan menu and detect allergens using fake OCR"""
    data = request.get_json()
    selected_allergens = [a.lower() for a in data.get("allergens", [])]

    # ✅ 1. Split OCR text into menu items
    menu_items = [item.strip() for item in MOCK_OCR_TEXT.strip().split("\n") if item.strip()]

    risky_items = []
    safe_items = []

    # ✅ 2. Analyze each menu item for allergens
    for item in menu_items:
        lowercase_item = item.lower()
        is_risk = False
        risk_allergen = None

        for allergen in selected_allergens:
            keywords = ALLERGEN_KEYWORDS.get(allergen, [])
            if any(keyword in lowercase_item for keyword in keywords):
                risky_items.append({
                    "item": item,
                    "reason": f"Contains {allergen}"
                })
                is_risk = True
                risk_allergen = allergen
                break

        if not is_risk:
            safe_items.append(item)

    # ✅ 3. Calculate safety score based on risk count
    risk_count = len(risky_items)
    safety_score = max(0, 100 - (risk_count * 12))

    return jsonify({
        "menu": menu_items,
        "riskyItems": risky_items,
        "safeItems": safe_items,
        "score": safety_score
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6000)
