import StripeModal from "@/components/StripeModal";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const generateRandomStory = async () => {
    setLoading(true);
    setError("");
    setIsOpen(true)

    try {
      // In a real implementation, you would call the OpenAI API here
      // For now, we'll simulate with a mock response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock story generation - in reality, this would call ChatGPT API
      const mockStories = [
        "Once upon a time, in a land far away, there lived a brave knight who discovered a mysterious map leading to a hidden treasure.",
        "A young scientist accidentally created a talking cat that could predict the future, changing everything she thought she knew about reality.",
        "In a bustling city, a librarian found a book that contained the memories of every person who had ever read it.",
        "A group of astronauts discovered a planet where music grew like flowers, and each note produced a different color.",
        "An ordinary  teenager found out they could speak to animals, and their life took an unexpected turn when they helped save a magical creature.",
      ];

      const randomStory =
        mockStories[Math.floor(Math.random() * mockStories.length)];
      setStory(randomStory);
    } catch (err) {
      setError("Failed to generate story. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateRandomStory();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <StripeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <h1>Random Story Generator</h1>
        <p>Click below to generate a new random story</p>
        <button
          onClick={generateRandomStory}
          disabled={loading}
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>

        {error && <p className="error">{error}</p>}

        {story && (
          <div className="story-container">
            <h2>Your Story:</h2>
            <p className="story-text">{story}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
