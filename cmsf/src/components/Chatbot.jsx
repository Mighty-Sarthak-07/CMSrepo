import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const API_KEY = "AIzaSyC8GbfJopoDjPGp7w-VmbZeOdDb1IbyDFI"; // Replace with your actual API key
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

      const prompt = `You are a virtual assistant that only answers complaint-related questions.
Accept questions about electrical issues like bulb or fan problems, maintenance problems, cleaning problems, or technical faults. If the question is not related to complaints, politely refuse to answer.

If the user requests, you can also translate any English content related to these subjects into Hindi accurately and clearly.
      User's question: "${currentQuestion}"`;

      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const aiResponse =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I can only respond to complaint-related questions.";

      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
    } catch (error) {
      console.error("Error fetching response:", error.response?.data || error.message);
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: "Error: Unable to fetch response. Try again!" },
      ]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
        <header className="text-center py-4">
          <h1 className="text-4xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
            Complaint Chatbot
          </h1>
        </header>

        {/* Chat Container */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-4 hide-scrollbar">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-blue-50 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome to Complaint Chatbot! 👋</h2>
                <p className="text-gray-600 mb-4">I only handle complaint-related issues:</p>
                <ul className="text-left list-disc ml-6">
                  <li>WiFi or Internet problems</li>
                  <li>Maintenance requests</li>
                  <li>Technical faults</li>
                </ul>
                <p className="text-gray-500 mt-6 text-sm">Type your complaint below and press Enter!</p>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg ${chat.type === "question"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  <div className="overflow-auto hide-scrollbar">
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}

          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 p-3 rounded-lg animate-pulse">Thinking...</div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={generateAnswer} className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-gray-300 rounded p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Describe your complaint..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
