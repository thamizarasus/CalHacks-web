# FoodAllerGuard

**One scan a day keeps the allergies away!**

---
## Description

FoodAllerGuard is a web application that analyzes the ingredients in a food item (either via live scan or still photos or text files) and alerts the user if the food item being evaluated contains any allergens or other possibly harmful ingredients.

---
## Tech Stack
- ### Frontend
	- **React** (^18.2.0)
	- **React Router DOM** (^7.9.4)
	- **Tailwind CSS** (^3.4.0)
	- **Vite** (^5.0.8)
- ### Backend
	- **Flask** (Python)
	- **Flask-CORS** (^4.0.0)
	- **OpenCV**
	- **pytesseract**

---
## Instructions

### Installing Dependencies

#### Frontend (JavaScript)
Navigate to the frontend directory and install dependencies:
```bash
cd foodallerguard/frontend
npm install
```

This will install all JavaScript resources including:
- **React** (^18.2.0) - UI library
- **React DOM** (^18.2.0) - React rendering
- **React Router DOM** (^7.9.4) - Client-side routing
- **Vite** (^5.0.8) - Build tool and dev server
- **Tailwind CSS** (^3.4.0) - Utility-first CSS framework
- **PostCSS** & **Autoprefixer** - CSS processing
- **ESLint** - Code linting
- **@vitejs/plugin-react** - React plugin for Vite

#### Backend (Python)
Navigate to the backend directory and install dependencies:
```bash
cd foodallerguard/backend
pip install -r requirements.txt
```

Or using pipenv:
```bash
pipenv install
```

This will install:
- **Flask** (^2.3.3) - Web framework
- **Flask-CORS** (^4.0.0) - Cross-origin resource sharing
- **python-dotenv** (^1.0.0) - Environment variables
- **pytesseract** - OCR for text extraction
- **opencv-python** - Computer vision library
- **Pillow** - Image processing

### Running the Application

1. Start the backend server:
```bash
cd foodallerguard/backend
python app.py
```

2. In a separate terminal, start the frontend development server:
```bash
cd foodallerguard/frontend
npm run dev
```

The application will be available at http://localhost:3000

---
## Developers

|Name|Role|Email|GitHub|
|-------------------|------------------------|-----------------------|------------|
|Thamizarasu Sankara|Team Lead & Frontend Dev| thamizarasus@gmail.com|thamizarasus|
|Ramanuja Mohanty|Backend Dev| ramanuja.mohanty@gmail.com|RamanujaMohanty|
|David Lei|Backend Dev| DavidtheDefender2003@gmail.com|CaliCanine|

---
## About Us
The concept for FoodAllerGuard began around 2024. We were having lunch at a restaurant when, suddenly, one of our members had an adverse reaction to the item they were eating.
After the affected individual received all relevant care, we were able to determine why they had that reaction: the allergens
were not clearly listed in the menu. Hence, FoodAllerGuard came into being, a web app (soon to be mobile) that allows users to
upload photos of their menus or menu PDFs and learn exactly which allergens are present in the food that can affect them.

---
## Credits
- OpenCV - Training Data
- pytesseract - Image Recognition Module

---
# <center>THANK YOU!</center>
