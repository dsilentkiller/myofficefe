import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { MessageCircle } from "lucide-react";

const questions = [
  "Hi there! 😊 What’s your full name?",
  "Which organization are you from?",
  "What's your role or designation there?",
  "How do you identify? (Male / Female / Other)",
  "Your primary phone number?",
  "Best email to contact you?",
  "Which district are you located in?",
  "And your municipality?",
  "Can you tell me your full street address?",
  "What’s the estimated amount you're looking to invest or spend?",
  "How urgent is your enquiry? (High / Medium / Low)",
  "What’s the purpose of your enquiry?",
  "Do you use any software now or manage everything manually?",
];

const CRMChatBot = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    if (inputValue.trim() === "") return;
    const newResponses = [...responses];
    newResponses[currentStep] = inputValue;
    setResponses(newResponses);
    setInputValue("");
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    const body = {
      name: responses[0],
      organization_name: responses[1],
      designation: responses[2],
      gender: responses[3],
      pri_phone: responses[4],
      email: responses[5],
      district: responses[6],
      municipality: responses[7],
      street_address: responses[8],
      estimated_amount: responses[9],
      priority: responses[10],
      enquiry_purpose: responses[11],
      use_existing_software: responses[12],
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/enquiry/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) alert("Thanks! Your information has been submitted.");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 text-white"
      >
        {/* <MessageCircle className="w-6 h-6" /> */}
      </button>

      {isOpen && (
        // <motion.div
        //   initial={{ opacity: 0, y: 50 }}
        //   animate={{ opacity: 1, y: 0 }}
        //   transition={{ duration: 0.3 }}
        //   className="w-[350px] h-[520px] bg-white rounded-2xl shadow-2xl p-4 flex flex-col mt-4"
        // >
        <div className="flex-1 overflow-y-auto space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">
            💬 Welcome to Our Smart Assistant!
          </h2>
          {currentStep < questions.length ? (
            <>
              <p className="text-gray-800 mt-2">{questions[currentStep]}</p>
              <input
                type="text"
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder="Type your answer here..."
              />
              <button
                onClick={handleNext}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </>
          ) : (
            <div>
              <p className="text-green-600 font-medium">
                🎉 You're all set! Ready to submit?
              </p>
              <button
                onClick={handleSubmit}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        // </motion.div>
      )}
    </div>
  );
};

export default CRMChatBot;

//     <div className="p-6 max-w-xl mx-auto rounded shadow-md bg-white">
//       {currentStep < questions.length ? (
//         <div>
//           <p className="mb-4 text-lg font-medium">{questions[currentStep]}</p>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleNext()}
//           />
//           <button
//             onClick={handleNext}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Next
//           </button>
//         </div>
//       ) : (
//         <div>
//           <p className="mb-4 text-green-600 font-semibold">
//             All questions answered. Ready to submit!
//           </p>
//           <button
//             onClick={handleSubmit}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CRMChatBot;
