
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAIResponse, setMessage } from "../../admin/redux/slice/ai_agent/aiChatSlice";  // Adjust the import path based on your file structure

const AIChat = () => {
  const dispatch = useDispatch();
  const { message, response, loading, error } = useSelector((state) => state.aiChat);

  const sendMessage = async () => {
    if (!message) return;
    dispatch(fetchAIResponse(message));  // Dispatch the Redux action to call the API
  };

  return (
    <div style={{ width: "50%", margin: "auto", textAlign: "center", padding: "20px" }}>
      <h2>CRM AI Chatbot</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => dispatch(setMessage(e.target.value))}  // Use Redux action to update message
        placeholder="Ask AI..."
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>
        {loading ? "Loading..." : "Send"}
      </button>
      {error && <p style={{ color: "red" }}><strong>{error}</strong></p>}
      <p><strong>AI Response:</strong> {response}</p>
    </div>
  );
};

export default AIChat;


// import React, { useState } from "react";
// import axios from "axios";

// const AIChat = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!message) return;
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8000/api/ai/chat/", {
//         query: message,
//       });
//       setResponse(res.data.response);
//     } catch (error) {
//       setResponse("Error: Unable to get a response.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ width: "50%", margin: "auto", textAlign: "center", padding: "20px" }}>
//       <h2>CRM AI Chatbot</h2>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Ask AI..."
//         style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
//       />
//       <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>
//         {loading ? "Loading..." : "Send"}
//       </button>
//       <p><strong>AI Response:</strong> {response}</p>
//     </div>
//   );
// };

// export default AIChat;
