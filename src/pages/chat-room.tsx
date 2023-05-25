import { useEffect, useState, ChangeEvent } from "react";

interface Message {
  id: number;
  content: string;
  createdAt: string;
}

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load messages from the server when the component is mounted
    fetch("/api/messages")
      .then((response) => response.json())
      .then((messages: Message[]) => setMessages(messages));
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message) {
      // Send the message to the server
      fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      })
        .then((response) => response.json())
        .then((newMessage: Message) => {
          // Add the new message to the state
          setMessages((messages) => [...messages, newMessage]);
          setMessage("");
        });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-2xl rounded-lg bg-white shadow-md">
        <div className="flex flex-col p-4">
          <div className="flex flex-col space-y-4">
            {/* TODO: Render the messages here */}
            <div className="text-gray-600">
              This is where the messages will be displayed.
            </div>
          </div>
          <div className="mt-4 flex">
            <input
              className="w-full rounded-lg border px-4 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleInputChange}
            />
            <button
              className="ml-2 rounded-lg border bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 focus:outline-none"
              onClick={handleSendClick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
