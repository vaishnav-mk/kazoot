import { useState, useEffect, useRef } from 'react';
export function useMessages(user) {
  let [messages, setMessages] = useState([]);
  if (user) {
    fetch(`/api/inbox/${user.uid}`)
      .then((i) => i.json())
      .then((i) => setMessages(i.messages));
  }
  return { messages };
}
