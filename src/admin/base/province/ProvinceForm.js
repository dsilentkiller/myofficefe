import React, { useState } from "react";
import axios from "axios";

const ProvinceForm = () => {
  // State to manage form data
  const [provinceName, setProvinceName] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to backend to create a new province
      await axios.post("/api/provinces/", { name: provinceName });

      // Clear form after successful submission
      setProvinceName("");
      alert("Province created successfully!");
    } catch (error) {
      console.error("Error creating province:", error);
      alert("Error creating province. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a new Province</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="provinceName">Province Name:</label>
          <input
            type="text"
            id="provinceName"
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProvinceForm;
