# Residential-Mortgage-Backed-Security

## 🚀 Overview
This project allows users to apply for mortgages, calculates credit ratings, and manages mortgage data.


## 🔹 Backend (Django)
1. Install dependencies: `pip install -r requirements.txt`
2. Configure `.env` for MySQL credentials
3. Run migrations: `python manage.py migrate`
4. Start the server: `python manage.py runserver`

## 🔹 Frontend (React)
1. Install dependencies: `npm install`
2. Start the app: `npm start`

## 🔹 API Endpoints
- **POST /api/mortgages/** → Accepts mortgage data and calculates credit rating.
- **GET /api/mortgages/** → Fetch all mortgages data
- **DELETE /api/mortgages/id/** → Delete mortgages data
