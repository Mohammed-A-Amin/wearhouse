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
import requests
from io import BytesIO
from PIL import Image
import base64

# === Gemini imports (DO NOT MODIFY import style per your request) ===
from google import genai
from google.genai import types

# ================================================================

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = str(os.getenv("DB_NAME"))
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
PORT = os.getenv("PORT")

# Gemini client
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

# Mongo
clerk_sdk = Clerk(bearer_auth=CLERK_SECRET_KEY)
mongo = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = mongo[DB_NAME]


# --------------------------------------------------------------
# AUTH – GET CURRENT USER
# --------------------------------------------------------------
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


# --------------------------------------------------------------
# ADD ITEMS TO CLOSET
# --------------------------------------------------------------
@app.route('/api/closet/add', methods=['POST'])
def add_to_closet():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"error": "No token provided"}), 401
    
    try:
        token = auth_header.split(" ")[1]
        payload = jwt.decode(token, options={"verify_signature": False})
        user_id = payload.get("sub")
        
        data = request.json
        items_to_add = data.get('items', [])

        if not items_to_add:
            return jsonify({"message": "No items to add"}), 400

        result = db.users.update_one(
            {"_id": user_id},
            {"$addToSet": {"closet": {"$each": items_to_add}}}
        )

        return jsonify({
            "success": True, 
            "message": f"Added {len(items_to_add)} items to closet",
            "modified_count": result.modified_count
        }), 200

    except Exception as e:
        print(f"Error adding to closet: {e}")
        return jsonify({"error": str(e)}), 500


# --------------------------------------------------------------
# GEMINI OUTFIT GENERATION ENDPOINT
# --------------------------------------------------------------
def download_image(url):
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    return Image.open(BytesIO(resp.content))

@app.route('/api/outfits/generate', methods=['POST'])
def generate_outfit():
    try:
        data = request.json
        items = data.get("items", [])
        user_image_b64 = data.get("userImage")

        if len(items) == 0:
            return jsonify({"error": "No items provided"}), 400

        print(f"Generating outfit for {len(items)} items...")

        # Optional: decode user image (for personal try-on)
        user_image_obj = None
        if user_image_b64:
            try:
                # Strip data URL prefix if present
                if "," in user_image_b64:
                    user_image_b64 = user_image_b64.split(",")[1]
                user_bytes = base64.b64decode(user_image_b64)
                user_image_obj = Image.open(BytesIO(user_bytes))
                print("User image loaded successfully.")
            except Exception as e:
                print(f"Failed to decode user image, falling back to mannequin: {e}")
                user_image_obj = None

        # Step 1 — Load each clothing image
        images = []
        for item in items:
            url = item.get("imageLink")
            if not url:
                continue

            try:
                img = download_image(url)
                images.append(img)
            except Exception as e:
                print(f"Failed to fetch image {url}: {e}")

        if len(images) == 0:
            return jsonify({"error": "No images downloaded"}), 400

        # Step 2 — Build prompt
        item_names = [
            item.get("productDisplayName", "clothing item") for item in items
        ]

        if user_image_obj:
            prompt = "Use the PERSON in the provided photo as the model.\n"
            prompt += "Do NOT change their face, body shape, skin tone, or pose.\n"
            prompt += "Overlay and fit ALL of the following clothing items naturally on their body:\n"
        else:
            prompt = "Create a full-body mannequin wearing ALL of the following items:\n"

        for name in item_names:
            prompt += f"- {name}\n"

        if user_image_obj:
            prompt += """
Match the lighting, perspective, and shadows of the original person photo.
Produce ONE final image of the same person wearing the entire outfit.
High-quality, realistic virtual try-on.
"""
        else:
            prompt += """
The output must be ONE outfit image. Fit clothes naturally on the mannequin.
White studio background. Realistic lighting. Professional fashion look.
"""

        # Step 3 — Prepare payload for Gemini
        payload = [prompt]

        # If we have a user photo, include it first
        if user_image_obj:
            payload.append(user_image_obj)

        # Then add clothing item images
        payload += images

        # Step 4 — Call Gemini
        chat = client.chats.create(
            model="gemini-3-pro-image-preview",
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE"]
            )
        )

        response = chat.send_message(payload)

        # Step 5 — Extract output image bytes
        generated_b64 = None
        for part in response.parts:
            if hasattr(part, "inline_data") and part.inline_data:
                image_bytes = part.inline_data.data  # RAW BYTES
                generated_b64 = base64.b64encode(image_bytes).decode("utf-8")
                break

        if not generated_b64:
            return jsonify({"error": "Gemini returned no image"}), 500

        return jsonify({
            "success": True,
            "generated_image": generated_b64,
            "item_count": len(items),
            "used_user_image": bool(user_image_obj),
        }), 200

    except Exception as e:
        print("Gemini outfit error:", e)
        return jsonify({"error": str(e)}), 500


# --------------------------------------------------------------
# HEALTH
# --------------------------------------------------------------
@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        mongo.db.command('ping')
        db_status = 'connected'
    except Exception as e:
        db_status = f'disconnected: {str(e)}'
    
        # Note: mongo here is a MongoClient, not a Flask-PyMongo instance.
        # If this errors, you can ignore or adjust, but it doesn't affect core flow.

    return jsonify({
        'status': 'healthy',
        'message': 'Wearhouse API is running',
        'database': db_status
    }), 200


# --------------------------------------------------------------
# ROOT
# --------------------------------------------------------------
@app.route('/api', methods=['GET'])
def api_root():
    return jsonify({
        'message': 'Welcome to Wearhouse API',
        'version': '1.0.0'
    }), 200


# --------------------------------------------------------------
# RUN
# --------------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)
