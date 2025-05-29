import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDay, fetchDays } from "../../../../redux/slice/admin/base/daySlice";

const DayForm = () => {
  const [formData, setFormData] = useState({ day_name: "" }); // Initialize with day_name
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createStatus } = useSelector(state => state.days?.list || {});

  const createError = useSelector((state) => state.days?.list || {});

  const days = useSelector((state) => state.days?.list || []);

  useEffect(() => {
    dispatch(fetchDays()); // Fetch days on mount
  }, [dispatch]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Day created successfully!");
      setFormData({ day_name: "" }); // Reset with day_name
      navigate("/dashboard/setup/day");
    }
  }, [createStatus, navigate]);

  useEffect(() => {
    if (createStatus === "failed") {
      toast.error(`Error: ${createError.message || "An error occurred"}`);
    }
  }, [createStatus, createError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Defensive check
    if (!formData.day_name || formData.day_name.trim() === "") {
      toast.error("Day name cannot be empty");
      return;
    }

    // Check for duplicate day_name ignoring case
    const existingDay = days.some(
      (day) =>
        day.day_name &&
        day.day_name.toLowerCase() === formData.day_name.toLowerCase()
    );

    if (existingDay) {
      toast.error("Day with this name already exists.");
      return;
    }

    dispatch(createDay(formData))
      .unwrap()
      .then(() => {
        setFormData({ day_name: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Create Error:", error);
      });
  };

  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h4 className="btn btn-primary">Add Day</h4>
            </div>
            <div className="card-body">
              {createError && (
                <p className="text-danger">
                  {typeof createError === 'string'
                    ? createError
                    : createError.message || JSON.stringify(createError)}
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="day_name">Name:</label>
                  <input
                    type="text"
                    id="day_name"
                    name="day_name"
                    value={formData.day_name}
                    className="form-control"
                    placeholder="Enter day Sunday, Monday..."
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={createStatus === "loading"}
                >
                  {createStatus === "loading" ? "Saving..." : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayForm;
