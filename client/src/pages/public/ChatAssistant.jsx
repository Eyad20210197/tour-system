// src/components/AiAssistant.jsx
import { useState } from "react";

function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleChat = () => setOpen(prev => !prev);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "nousresearch/deephermes-3-mistral-24b-preview:free",
                    messages: [
                        { role: "system", content: "You are TourBot in Kemet Wonders , an expert assistant in Egyptian tourism. Be friendly, concise, and only answer questions related to travel in Egypt. Answer as short answers as possible " },
                        { role: "user", content: input }
                    ]
                })
            });

            const data = await res.json();
            const aiReply = data.choices?.[0]?.message?.content || "Sorry, I didn’t understand.";

            setMessages([...newMessages, { from: "ai", text: aiReply }]);
        } catch (err) {
            console.error("AI error:", err);
        }
    };

    return (
        <>
            {/* Floating button */}
            <div className="chat-float" onClick={toggleChat}><i class="fa-solid fa-message"></i></div>

            {/* Chat box */}
            {open && (
                <div className="chat-box">
                    <div className="chat-header">
                        <strong>Tour Assistant</strong>
                        <button onClick={toggleChat}><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={msg.from}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatAssistant;
