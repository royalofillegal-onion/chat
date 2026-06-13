from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.messages import messages_bp
from routes.users import users_bp
from routes.upload import upload_bp

load_dotenv()

app = Flask(
    __name__,
    static_folder="../public",
    static_url_path="",
    template_folder="../templates"
)
CORS(app)

app.register_blueprint(messages_bp)
app.register_blueprint(users_bp)
app.register_blueprint(upload_bp)

@app.route("/")
def home():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
