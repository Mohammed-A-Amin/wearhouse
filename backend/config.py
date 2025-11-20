import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Flask configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY') 
    MONGO_URI = os.environ.get('MONGO_URI') 
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
    
    # Flask settings
    DEBUG = os.environ.get('FLASK_DEBUG', 'True') == 'True'
    TESTING = False
    
    # CORS settings
    CORS_HEADERS = 'Content-Type'
