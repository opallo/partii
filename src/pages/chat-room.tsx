import type { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  content: string;
  createdAt: Date;
}

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages");
        const data: Message[] = await res.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async (event: FormEvent) => {
    event.preventDefault();
    if (message) {
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: message }),
        });
        const newMessage: Message = await response.json();
        setMessages((messages) => [...messages, newMessage]);
        setMessage("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <form onSubmit={handleSendClick}>
        <input type="text" value={message} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
