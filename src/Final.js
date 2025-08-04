import React, { useState } from "react";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const Survey = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([
    "Hi there! Can you tell us your name?",
    "How are you feeling today in a few words?",
  ]);

  const handleChange = (e) => {
    const updated = [...responses];
    updated[step] = e.target.value;
    setResponses(updated);
  };

  const handleNext = () => {
    const currentResponse = responses[step] || "";

    if (step === 1) {
      const moodScore = sentiment.analyze(currentResponse).score;
      if (moodScore > 0) {
        setQuestions((prev) => [
          ...prev,
          "That's great to hear! What has made you feel this way today?",
          "What’s something you're looking forward to this week?",
        ]);
      } else if (moodScore < 0) {
        setQuestions((prev) => [
          ...prev,
          "I'm sorry to hear that. Would you like to share what's bothering you?",
          "What’s one small thing that could improve your day?",
        ]);
      } else {
        setQuestions((prev) => [
          ...prev,
          "Thanks for sharing. Is there anything you'd like to talk about?",
          "What helps you stay balanced during a typical day?",
        ]);
      }
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      alert("🎉 Thank you for completing the IntelliSurvey!");
      console.log("Final responses:", responses);
    }
  };

  return (
    <div className="survey-box">
      <h2>Step {step + 1} of {questions.length}</h2>
      <p>{questions[step]}</p>
      <input
        type="text"
        value={responses[step] || ""}
        onChange={handleChange}
        placeholder="Type your answer here..."
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "80%",
          margin: "20px 0",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Survey;
