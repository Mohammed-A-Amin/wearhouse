# Wearhouse Backend

Flask backend 

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
   - Add your MongoDB URI
   - Add your Gemini API key
   - Set a secure SECRET_KEY for production

## Running the App

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api` - API root endpoint

## Technologies

- Flask - Web framework
- MongoDB - Database
- Gemini API - AI image generation
- Flask-CORS - Cross-origin resource sharing
