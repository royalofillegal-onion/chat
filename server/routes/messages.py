from flask import Blueprint, request, jsonify

messages_bp = Blueprint("messages", __name__)

@messages_bp.route("/api/chatbot", methods=["POST"])
def chatbot():
    payload = request.get_json() or {}
    user_text = payload.get("message", "").strip()
    user_info = payload.get("user", {})

    if not user_text:
        return jsonify({"reply": "Please send a message to the bot."}), 400

    bot_reply = request_chatbot_response(user_text, user_info)
    return jsonify({"reply": bot_reply})


def request_chatbot_response(message, user_info):
    """
    Replace this function with your original API integration.
    Example: call your chatbot backend, pass the prompt, and return the response text.
    """
    user_name = user_info.get("displayName") or user_info.get("email") or "Guest"

    return (
        f"Hello {user_name}! Your message was: '{message}'. "
        "This is a placeholder response until you connect your original API."
    )
