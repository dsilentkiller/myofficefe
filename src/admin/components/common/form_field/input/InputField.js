
import React, { useState } from 'react';

const InputField = ({
    label,
    id,
    name,
    value,
    onChange,
    onBlur,
    type = "text",
    required = false,
    placeholder = "",
    validate = () => "", // function returning error message if invalid
}) => {
    const [touched, setTouched] = useState(false);
    const error = validate(value);

    const handleBlur = (e) => {
        setTouched(true);
        onBlur?.(e);
    };

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}{required && <span className="text-danger"> *</span>}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={`form-control ${touched && error ? "is-invalid" : ""}`}
                required={required}
            />
            {touched && error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;


// const InputField = ({ label, id, name, value, onChange, type = "text", required = false }) => (
//     <div className="form-group">
//         <label htmlFor={id}>{label}</label>
//         <input
//             type={type}
//             id={id}
//             name={name}
//             value={value}
//             onChange={onChange}
//             className="form-control"
//             required={required}
//         />
//     </div>
// );
// export default InputField