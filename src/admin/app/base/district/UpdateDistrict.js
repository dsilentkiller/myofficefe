import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchDistrictById,
  updateDistrict,
} from "../../../../redux/slice/admin/base/districtSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDistrict = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const district = useSelector((state) =>
    state.districts.list.find((prov) => prov.id === parseInt(id))
  );
  const [districtName, setDistrictName] = useState("");
  const updateStatus = useSelector((state) => state.districts.updateStatus);
  const updateError = useSelector((state) => state.districts.updateError);

  useEffect(() => {
    if (district) {
      setDistrictName(district.name);
    } else {
      dispatch(fetchDistrictById(id))
        .unwrap()
        .catch((error) => {
          toast.error(
            `Failed to fetch district: ${error.message || "Unknown error"}`
          );
        });
    }
  }, [dispatch, id, district]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDistrict({ id, name: districtName }))
      .unwrap()
      .catch((error) => {
        toast.error(
          `Failed to update district: ${error.message || "Unknown error"}`
        );
      });
  };

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("District updated successfully!");
      navigate("/dashboard/setup/district");
    } else if (updateStatus === "failed") {
      toast.error(
        `Failed to update district: ${updateError || "Unknown error"}`
      );
    }
  }, [updateStatus, navigate, updateError]);

  return (
    <div>
      <h2>Update District</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={districtName}
          onChange={(e) => setDistrictName(e.target.value)}
          required
        />
        <button type="submit">Update District</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateDistrict;
