# ChatBot App

A lightweight chat app scaffold with Firebase authentication and a bot API placeholder.

## What is included

- `public/` front-end pages and styles
- Firebase authentication using email/password and Google sign-in
- `chat.html` chat UI with message bubbles and bot reply placeholder
- `server/` Flask backend with `/api/chatbot` route stub

## Setup

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Fill in your Firebase config values in `public/js/firebase-config.js`.

3. Run the Flask server:

```bash
python server/app.py
```

4. Open the app in your browser:

- `http://127.0.0.1:5000/` for the landing page

## Add your original API

- Update `server/routes/messages.py` in `request_chatbot_response()`.
- Replace the placeholder response with a real request to your chatbot API.
- Use `requests` or any HTTP client to call the external service.

## Notes

- The chat app stores messages in Firestore in the `messages` collection.
- Sign-in and sign-up are handled in `public/js/auth.js`.
- The UI is styled for mobile-first screens with the theme from the supplied design.
