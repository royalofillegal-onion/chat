import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const authForm = document.getElementById("auth-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit-button");
const toggleMode = document.getElementById("toggle-mode");
const toggleText = document.getElementById("toggle-text");
const googleButton = document.getElementById("google-signin");
const errorElement = document.getElementById("error");

let isSignUp = false;

function setMode() {
  submitButton.textContent = isSignUp ? "Create account" : "Sign In";
  toggleText.textContent = isSignUp ? "Already have an account?" : "New here?";
  toggleMode.textContent = isSignUp ? "Sign In" : "Create account";
  errorElement.textContent = "";
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  errorElement.textContent = "";

  try {
    if (isSignUp) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    window.location.href = "chat.html";
  } catch (error) {
    errorElement.textContent = error.message;
  }
});

toggleMode.addEventListener("click", () => {
  isSignUp = !isSignUp;
  setMode();
});

googleButton.addEventListener("click", async () => {
  errorElement.textContent = "";
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "chat.html";
  } catch (error) {
    errorElement.textContent = error.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "chat.html";
  }
});

setMode();
