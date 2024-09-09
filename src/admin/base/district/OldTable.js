import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDistrict } from "../../redux/slice/districtSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../../../admin/css/Table.css";

const DistrictList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const { list, isLoading, error } = useSelector((state) => state.districts);

  useEffect(() => {
    dispatch(fetchDistrict());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredDistricts(
        list.filter((district) =>
          district.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDistricts(list);
    }
  }, [searchTerm, list]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <h5 className="navbar-brand">District List</h5>
                <div className="navbar-nav ml-auto">
                  <Link to="create" className="nav-link btn btn-info">
                    <h5>Add district</h5>
                  </Link>
                  <form className="form-inline ml-3">
                    <div className="input-group">
                      <input
                        type="search"
                        id="default-search"
                        name="search"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-info">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
            <div className="table-container">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((district, index) => (
                      <tr key={district.id}>
                        <td>{index + 1}</td>
                        <td>{formatName(district.name)}</td>
                        <td>
                          <Link
                            to={`update/${district.id}`}
                            className="action-button edit"
                          >
                            <FaEdit />
                          </Link>
                          <span> | </span>
                          <Link
                            to={`delete/${district.id}`}
                            className="action-button delete"
                          >
                            <FaTrash style={{ cursor: "pointer" }} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No districts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictList;
