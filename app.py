from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Demo users
users = {
    "a": "123",
    "b": "098"
}

# Store messages in memory
messages = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username in users and users[username] == password:
        return jsonify({
            "success": True,
            "username": username
        })

    return jsonify({
        "success": False,
        "message": "Invalid credentials"
    }), 401


@app.route("/send", methods=["POST"])
def send():
    data = request.json

    sender = data.get("sender")
    receiver = data.get("receiver")
    text = data.get("text")

    if not sender or not receiver or not text:
        return jsonify({"success": False})

    messages.append({
        "sender": sender,
        "receiver": receiver,
        "text": text
    })

    return jsonify({"success": True})


@app.route("/messages/<username>")
def get_messages(username):

    user_messages = []

    for msg in messages:
        if msg["sender"] == username or msg["receiver"] == username:
            user_messages.append(msg)

    return jsonify(user_messages)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)