import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchMunicipalityById,
  updateMunicipality as updateMunicipalityAction, // Correct import statement
} from "../../../../redux/slice/admin/base/municipalitySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MunicipalityUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const municipality = useSelector((state) =>
    state.municipalities.list.find((prov) => prov.id === parseInt(id))
  );
  const [municipalityName, setMunicipalityName] = useState("");
  const updateStatus = useSelector(
    (state) => state.municipalities.updateStatus
  );

  useEffect(() => {
    if (municipality) {
      setMunicipalityName(municipality.name);
    } else {
      dispatch(fetchMunicipalityById(id));
    }
  }, [dispatch, id, municipality]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMunicipalityAction({ id, name: municipalityName })); // Dispatch the correct action
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Municipality updated successfully!");
      navigate("/municipalities"); // Ensure the correct route for navigation
    } else if (updateStatus === "failed") {
      toast.error("Failed to update municipality.");
    }
  }, [updateStatus, navigate]);

  return (
    <div className="container">
      <h2>Update Municipality</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="municipalityName">Municipality Name:</label>
          <input
            type="text"
            id="municipalityName"
            value={municipalityName}
            onChange={(e) => setMunicipalityName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Municipality
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MunicipalityUpdate;
