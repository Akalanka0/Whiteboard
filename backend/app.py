from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# MongoDB connection
client = MongoClient("mongodb://mongo:27017/")
db = client["whiteboard_db"]
collection = db["drawings"]

# Health check
@app.route("/", methods=["GET"])
def home():
    return "Backend is running"

# Save drawing
@app.route("/save", methods=["POST"])
def save_drawing():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    collection.insert_one({
        "drawing": data
    })

    return jsonify({"message": "Drawing saved successfully"})

# Load latest drawing
@app.route("/load", methods=["GET"])
def load_drawing():
    drawing = collection.find_one(sort=[("_id", -1)])

    if not drawing:
        return jsonify([])

    return jsonify(drawing["drawing"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
