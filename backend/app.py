from flask import Flask, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize MongoDB
mongo = PyMongo(app)

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
