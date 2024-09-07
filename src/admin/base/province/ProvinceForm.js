import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProvince, fetchProvince } from "../../redux/slice/provinceSlice";

const ProvinceForm = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch existing provinces and status/error states from Redux
  const createStatus = useSelector((state) => state.provinces.createStatus);
  const createError = useSelector((state) => state.provinces.createError);
  const provinces = useSelector((state) => state.provinces.list);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch existing provinces when the component mounts
  useEffect(() => {
    dispatch(fetchProvince());
  }, [dispatch]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the province name already exists
    const isDuplicate = provinces.some(
      (province) => province.name.toLowerCase() === formData.name.toLowerCase()
    );

    if (isDuplicate) {
      setError("Province name already exists!");
    } else {
      setError(null);
      dispatch(createProvince(formData));
    }
  };

  // Redirect on successful creation
  useEffect(() => {
    if (createStatus === "succeeded") {
      // Optionally, you can display a success message here
      alert("Province created successfully!");
      // Redirect to the ProvinceList component
      navigate("/dashboard/setup/province"); // Adjust the path as needed
    }
  }, [createStatus, navigate]);

  return (
    <div>
      <h2>Create a new Province</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="provinceName">Province Name:</label>
          <input
            type="text"
            id="provinceName"
            name="name"
            value={formData.name}
            onChange={handleChange} // Update formData on change
            required
          />
        </div>
        {/* Display error messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {createError && (
          <p style={{ color: "red" }}>
            {/* Ensure that createError.message is a string */}
            {typeof createError.message === "string"
              ? createError.message
              : "An error occurred while creating the province."}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProvinceForm;
