import React, { useState, useEffect } from "react";
import axios from "axios";

const ProvinceList = () => {
  // State to store the list of provinces
  const [provinces, setProvinces] = useState([]);
  // State to store the new province name
  const [newProvinceName, setNewProvinceName] = useState("");

  // Function to fetch the list of provinces from the backend
  const fetchProvinces = async () => {
    try {
      const response = await axios.get("/api/provinces/");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Function to handle adding a new province
  const handleAddProvince = async () => {
    try {
      // Check if the new province name is not empty
      if (newProvinceName.trim() === "") {
        alert("Please enter a valid province name");
        return;
      }
      // Send a POST request to add the new province
      await axios.post("/api/provinces/", { name: newProvinceName.trim() });
      // Fetch the updated list of provinces
      fetchProvinces();
      // Clear the input field after adding the province
      setNewProvinceName("");
    } catch (error) {
      console.error("Error adding province:", error);
    }
  };

  // Fetch provinces when the component mounts
  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="card">
          <div className="card-header">
            <div className="p-6 bg-white border-b border-gray-200">
              <h5 className="mx-20">Province List</h5>
              <div className="text-right">
                <div className="input-group">
                  <input
                    type="text"
                    value={newProvinceName}
                    onChange={(e) => setNewProvinceName(e.target.value)}
                    placeholder="Enter province name"
                  />
                  <button onClick={handleAddProvince}>Add Province</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {provinces.length > 0 ? (
                  provinces.map((province, index) => (
                    <tr key={index}>
                      <td>{province.id}</td>
                      <td>{province.name}</td>
                      <td>
                        <a href={`/province/edit/${province.id}`}>Edit</a>
                        <span> | </span>
                        <a href={`/province/delete/${province.id}`}>Delete</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No countries</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvinceList;
