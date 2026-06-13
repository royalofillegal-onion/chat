from flask import Blueprint, jsonify

users_bp = Blueprint("users", __name__)

@users_bp.route("/api/users", methods=["GET"])
def list_users():
    return jsonify({"users": []})
