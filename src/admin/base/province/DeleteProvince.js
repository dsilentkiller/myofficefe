import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProvince } from "../../redux/slice/provinceSlice";
import { toast } from "react-toastify";

const DeleteProvince = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteStatus = useSelector((state) => state.provinces.deleteStatus);
  const deleteError = useSelector((state) => state.provinces.deleteError);

  // const handleDelete = () => {
  //   dispatch(deleteProvince(id));
  // };
  const handleDelete = () => {
    dispatch(deleteProvince(id))
      .unwrap()
      .then(() => {
        toast.success("Province deleted successfully!");
        navigate("province"); // Redirect to province list
      })
      .catch(() => {
        toast.error(`Failed to delete province: ${deleteError?.message}`);
      });
  };

  const handleCancel = () => {
    navigate("province");
  };

  if (deleteStatus === "succeeded") {
    alert("Province deleted successfully!");
    navigate("province");
  }

  return (
    <div>
      <h2>Are you sure you want to delete this province?</h2>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DeleteProvince;
