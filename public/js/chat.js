import { auth, db } from "./firebase-config.js";
import { watchUser, logout } from "./users.js";
import { renderMessage, formatTimestamp } from "./ui.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const messagesEl = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const signOutButton = document.getElementById("sign-out");
const userNameEl = document.getElementById("user-name");

let currentUser = null;

watchUser((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user;
  userNameEl.textContent = user.displayName || user.email;
  subscribeToMessages();
});

signOutButton.addEventListener("click", async () => {
  await logout();
});

function subscribeToMessages() {
  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

  onSnapshot(messagesQuery, (snapshot) => {
    messagesEl.innerHTML = "";
    snapshot.forEach((doc) => {
      const message = doc.data();
      messagesEl.appendChild(renderMessage(message));
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

async function saveMessage(text, sender) {
  const messagesRef = collection(db, "messages");
  await addDoc(messagesRef, {
    author: currentUser.email,
    displayName: currentUser.displayName || currentUser.email,
    text,
    sender,
    createdAt: serverTimestamp()
  });
}

async function sendToBot(text) {
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        user: {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
        }
      })
    });

    if (!response.ok) {
      throw new Error("Bot API request failed");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    return `Bot placeholder reply: I received your message and your original API can be added in server/routes/messages.py.`;
  }
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();

  if (!text || !currentUser) {
    return;
  }

  messageInput.value = "";
  await saveMessage(text, "user");
  const botReply = await sendToBot(text);
  await saveMessage(botReply, "bot");
});
