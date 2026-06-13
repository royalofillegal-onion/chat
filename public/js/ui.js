export function renderMessage(message) {
  const wrapper = document.createElement("div");
  wrapper.className = `message-bubble ${message.sender === "user" ? "message-user" : "message-bot"}`;

  const textElement = document.createElement("div");
  textElement.textContent = message.text;
  wrapper.appendChild(textElement);

  const meta = document.createElement("div");
  meta.className = "message-meta";
  meta.textContent = `${message.sender === "user" ? "You" : "Bot"} · ${formatTimestamp(message.createdAt)}`;
  wrapper.appendChild(meta);

  return wrapper;
}

export function formatTimestamp(timestamp) {
  if (!timestamp || !timestamp.toDate) {
    return "just now";
  }
  const date = timestamp.toDate();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
