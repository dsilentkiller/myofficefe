// SpeechToText.js
import React, { useState } from "react";

// Ensure SpeechRecognition is accessed correctly based on browser support
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const SpeechToText = ({ onTextChange }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  if (!SpeechRecognition) {
    return <div>Speech Recognition API is not supported in this browser.</div>;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    setTranscript(speechResult);
    onTextChange(speechResult);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    alert("Speech recognition error: " + event.error);
  };

  const handleListen = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div>
      <button onClick={handleListen}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
