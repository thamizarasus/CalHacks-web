# FoodAllerGuard Backend

A Flask-based REST API for food allergen detection and ingredient checking.

## Features

- RESTful API endpoints for allergen checking
- Comprehensive allergen database
- Cross-origin resource sharing (CORS) support
- Health check endpoint

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET /api/allergens
Returns a list of all available allergens.

### POST /api/check
Check ingredients against user's allergens.

**Request body:**
```json
{
  "allergens": ["nuts", "dairy"],
  "ingredients": ["milk chocolate", "almond flour"]
}
```

**Response:**
```json
{
  "safe": false,
  "found_allergens": [
    {
      "allergen": "nuts",
      "ingredient": "almond flour",
      "matched_term": "almond"
    },
    {
      "allergen": "dairy",
      "ingredient": "milk chocolate",
      "matched_term": "milk"
    }
  ]
}
```

### GET /api/health
Health check endpoint.

## Allergen Database

The `allergens.json` file contains a comprehensive database of allergens and their associated ingredients/terms that should be flagged.
