# Wearhouse

A clothing dating app that displays articles of clothing based on preferences. Swipe to discard or save into your closet where you can digitally try on your clothing via AI.

## Project Structure

```
wearhouse/
├── backend/          # Flask API
└── frontend/         # Next.js app
```

## Features

- **Clothing Selection**: Browse clothing items based on your preferences
- **Digital Closet**: Save your favorite items to your personal collection
- **AI Try-On**: Use AI to virtually try on clothing combinations
- **Style Ideas**: Get wear and thrift flip ideas for each item

## Technologies

### Frontend
- Next.js 15
- React 18
- Tailwind CSS
- JavaScript (ES6+)

### Backend
- Flask
- MongoDB
- Gemini API (AI image generation)
- Python 3.x

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your credentials

6. Run the Flask app:
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## Data Model

### Users
- User ID
- Email
- Username
- Password
- Closet (collection of individual items)
- Outfits (collection of pictures)

## Timeline

- **Week 1**: Final designs, setup repositories, data model
- **Week 2-3**: Development
- **Week 4**: Finalization and deployment on Vercel
- **Dec 5**: Launch!

## Team

Project Demonz
