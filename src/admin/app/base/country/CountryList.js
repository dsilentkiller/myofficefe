import React, { useState } from "react";

const CountryList = ({ countries }) => {
  const [newCountryName, setNewCountryName] = useState("");
  const [countryList, setCountryList] = useState(countries);

  const handleAddCountry = () => {
    if (newCountryName.trim() === "") {
      alert("Please enter a valid country name");
      return;
    }
    // Create a new country object
    const newCountry = {
      id: countryList.length + 1, // Generate a unique id for the new country
      name: newCountryName.trim(),
    };
    // Update the country list with the new country
    setCountryList([...countryList, newCountry]);
    // Clear the input field after adding the country
    setNewCountryName("");
  };

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="card">
          <div className="card-header">
            <div className="p-6 bg-white border-b border-gray-200">
              <h5 className="mx-20">Country List</h5>
              <div className="text-right">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="New Country Name"
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                  />
                  <button className="btn btn-info" onClick={handleAddCountry}>
                    Add Country
                  </button>
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
                {countryList.length > 0 ? (
                  countryList.map((country, index) => (
                    <tr key={index}>
                      <td>{country.id}</td>
                      <td>{country.name}</td>
                      <td>
                        <a href={`/country/edit/${country.id}`}>Edit</a>
                        <span> | </span>
                        <a href={`/country/delete/${country.id}`}>Delete</a>
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

export default CountryList;
