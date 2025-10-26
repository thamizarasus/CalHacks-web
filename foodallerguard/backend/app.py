from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load allergens data
def load_allergens():
    try:
        with open('allergens.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

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
