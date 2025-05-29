import React, { useState } from "react";

const GeneralForm = ({
  fields,
  initialValues,
  mode,
  onSubmit,
  onBackToTable
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });

    // Auto-change status example
    if (name === "phone" && value.length >= 10) {
      setFormValues((prevValues) => ({
        ...prevValues,
        status: "Active",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="general-form">
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="form-control"
            />
          )}
          {field.type === "phone" && (
            <input
              type="tel"
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder || "Enter phone number"}
              className="form-control"
            />
          )}
          {field.type === "textarea" && (
            <textarea
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder || "Enter details"}
              className="form-control"
              rows={field.rows || 4}
            />
          )}
          {field.type === "select" && (
            <select
              name={field.name}
              id={field.name}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">-- Select --</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {field.type === "radio" && (
            <div>
              {field.options.map((option, idx) => (
                <label key={idx} className="radio-label">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formValues[field.name] === option.value}
                    onChange={handleChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Display Status Field */}
      <div className="form-group">
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={formValues.status || "Inactive"}
          readOnly
          className="form-control"
        />
      </div>

      {/* Buttons */}
      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {mode === "update" ? "Update" : "Save"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBackToTable}
        >
          Back to Table
        </button>
      </div>
    </form>
  );
};

export default GeneralForm;
