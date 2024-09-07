import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProvinceById,
  updateProvince,
} from "../../redux/slice/provinceSlice";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles

const UpdateProvince = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const province = useSelector((state) =>
    state.provinces.list.find((prov) => prov.id === parseInt(id))
  );
  const [provinceName, setProvinceName] = useState("");
  const updateStatus = useSelector((state) => state.provinces.updateStatus);

  useEffect(() => {
    if (province) {
      setProvinceName(province.name);
    } else {
      dispatch(fetchProvinceById(id));
    }
  }, [dispatch, id, province]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProvince({ id, name: provinceName }));
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Province updated successfully!"); // Show success toast
      navigate("province");
    } else if (updateStatus === "failed") {
      toast.error("Failed to update province."); // Show error toast if needed
    }
  }, [updateStatus, navigate]);

  return (
    <div>
      <h2>Update Province</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
          required
        />
        <button type="submit">Update Province</button>
      </form>
    </div>
  );
};

export default UpdateProvince;
