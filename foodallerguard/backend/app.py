from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import cv2 as cv
import numpy as np
import pytesseract

app = Flask(__name__)
CORS(app)

textDetector = cv.dnn_TextDetectionModel_EAST("/home/calicanine/Documents/CalHacks-web/foodallerguard/backend/frozen_east_text_detection.pb")
textDetector.setNMSThreshold(0.4)
textDetector.setConfidenceThreshold(0.8)

# Load allergens data
def load_allergens():
    try:
        with open('allergens.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

@app.route("/", methods=["GET"])
def home_page():
    """Load the home page"""
    camera = cv.VideoCapture(0)
    ret, frame = camera.read()

    textDetector.setInputParams(1.0, frame.shape[0:2], (123.68, 116.78, 103.94), True)

    message = ""
    if not camera.isOpened():
        message = "<p>Error: camera cannot be opened...</p>"
        return message
    
    while True:
        ret, frame = camera.read()
        if not ret:
            message = "<p>Error: Unable to receive frame...</p>"
            break

        boxes, confidences = textDetector.detect(frame)
        for box in boxes:
            cv.polylines(frame, [np.array(box, np.int32)], isClosed=True, color=(0, 255, 0), thickness=1)

        img_rgb = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        word = pytesseract.image_to_string(img_rgb)
        print(word)

        cv.imshow("FoodAllerGuard", frame)

        if cv.waitKey(1) == ord("q"):
            message = "<p>Stream ended...</p>"
            break
    
    camera.release()
    cv.destroyAllWindows()

    return message

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
