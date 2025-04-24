import React, { useState, useEffect } from "react";
import axios from "axios";

const ProvinceDistrictSelector = ({
  onProvinceChange,
  onDistrictChange,
  selectedProvince,
  selectedDistrict,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Fetch provinces when component mounts
    axios
      .get("/api/setup/province/") // Adjust endpoint based on your setup
      .then((response) => setProvinces(response.data))
      .catch((error) => console.error("Error fetching provinces:", error));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`/api/setup/district/${selectedProvince}/`)
        .then((response) => setDistricts(response.data))
        .catch((error) => console.error("Error fetching districts:", error));
    }
  }, [selectedProvince]);

  return (
    <div>
      <label>Province:</label>
      <select
        value={selectedProvince || ""}
        onChange={(e) => onProvinceChange(e.target.value)}
      >
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <label>District:</label>
      <select
        value={selectedDistrict || ""}
        onChange={(e) => onDistrictChange(e.target.value)}
        disabled={!selectedProvince}
      >
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceDistrictSelector;
