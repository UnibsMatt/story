import { useState } from "react";
import { flushSync } from "react-dom";
import "./App.css";

import ReactMarkdown from "react-markdown";
import StripeModal from "./components/StripeModal";

function App() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const generateRandomStory = async () => {
    setLoading(true);
    setError("");
    setStory(""); // Clear previous story
    try {
      // ✅ Call ChatGPT API with streaming
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // store in .env
          },
          body: JSON.stringify({
            model: "gpt-4o-mini", // lightweight GPT-4 model
            messages: [
              {
                role: "system",
                content:
                  "Tell a random children's story (5–7 short paragraphs) by rolling dice to pick a hero, sidekick, setting, and problem from fun, silly options. Use playful language for kids aged [insert age], add surprises, and end with a cheerful moral..",
              },
              {
                role: "user",
                content:
                  "Write me a short random story with a whimsical twist.",
              },
            ],
            max_tokens: 500,
            stream: true, // Enable streaming
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullStory = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                setLoading(false);
                return;
              }

              if (data) {
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullStory += content;
                    // Force React to update immediately with flushSync
                    flushSync(() => {
                      setStory(fullStory);
                    });
                  }
                } catch (e) {
                  // Skip invalid JSON lines
                  console.log('Skipping invalid JSON:', data);
                  continue;
                }
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
        setLoading(false);
      }

      if (!fullStory.trim()) {
        // fallback to mock stories if streaming fails
        const mockStories = [
          "Once upon a time, in a land far away, there lived a brave knight who discovered a mysterious map leading to a hidden treasure.",
          "A young scientist accidentally created a talking cat that could predict the future, changing everything she thought she knew about reality.",
          "In a bustling city, a librarian found a book that contained the memories of every person who had ever read it.",
          "A group of astronauts discovered a planet where music grew like flowers, and each note produced a different color.",
          "An ordinary teenager found out they could speak to animals, and their life took an unexpected turn when they helped save a magical creature.",
        ];
        const randomStory =
          mockStories[Math.floor(Math.random() * mockStories.length)];
        setStory(randomStory);
      }
    } catch (err) {
      setError("Failed to generate story. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key="app" className="App">
      <h1>Random Story Generator</h1>
      <p>Click below to generate a new random story</p>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={generateRandomStory}
          disabled={loading}
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
        <button onClick={() => setIsOpen(true)} className="generate-btn">
          {"Add token"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {story && (
        <div className="story-container">
          <h2>Your Story:</h2>
          <ReactMarkdown>{story}</ReactMarkdown>
        </div>
      )}
      <StripeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default App;
