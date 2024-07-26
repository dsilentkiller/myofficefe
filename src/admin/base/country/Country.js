import React, { useState } from "react";
import axios from "axios";

const CountryForm = () => {
  // State to manage form data
  const [countryName, setCountryName] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to backend to create a new country
      await axios.post("/api/countries/", { name: countryName });

      // Clear form after successful submission
      setCountryName("");
      alert("Country created successfully!");
    } catch (error) {
      console.error("Error creating country:", error);
      alert("Error creating country. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create a new Country</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="countryName">Country Name:</label>
          <input
            type="text"
            id="countryName"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CountryForm;
