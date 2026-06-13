import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function watchUser(callback) {
  onAuthStateChanged(auth, callback);
}

export async function logout() {
  await signOut(auth);
  window.location.href = "login.html";
}
