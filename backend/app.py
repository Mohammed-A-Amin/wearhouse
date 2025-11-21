import os
import jwt
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import pymongo
from pymongo import MongoClient
from config import Config
from clerk_backend_api import Clerk
import certifi

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

app = Flask(__name__)
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = str(os.getenv("DB_NAME"))
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
PORT = os.getenv("PORT")

clerk_sdk = Clerk(bearer_auth=CLERK_SECRET_KEY)
mongo = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = mongo[DB_NAME]

@app.route('/api/me', methods=['GET'])
def get_my_data():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "No token provided"}), 401
    
    token = auth_header.split(" ")[1]
    
    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        session_id = payload.get("sid")
        user_id = payload.get("sub")

        session = clerk_sdk.sessions.get(session_id=session_id)
        
        if session.status != "active":
             return jsonify({"error": "Session inactive"}), 401

        user = db.users.find_one({"_id": user_id})
        
        if not user:
            print(f"User {user_id} missing. Syncing...")
            clerk_user = clerk_sdk.users.get(user_id=user_id)
            
            new_user = {
                "_id": user_id,
                "email": clerk_user.email_addresses[0].email_address,
                "first_name": clerk_user.first_name,
                "last_name": clerk_user.last_name,
            }
            
            db.users.insert_one(new_user)
            user = new_user
            
        return jsonify(user)

    except Exception as e:
        print(f"Auth Error: {e}")
        return jsonify({"error": "Invalid Session"}), 401

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        mongo.db.command('ping')
        db_status = 'connected'
    except Exception as e:
        db_status = f'disconnected: {str(e)}'
    
    return jsonify({
        'status': 'healthy', 
        'message': 'Wearhouse API is running',
        'database': db_status
    }), 200

@app.route('/api', methods=['GET'])
def api_root():
    """API root endpoint"""
    return jsonify({
        'message': 'Welcome to Wearhouse API',
        'version': '1.0.0'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
