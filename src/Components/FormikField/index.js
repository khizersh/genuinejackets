import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "./style.css";
const FormikField = ({ type, name, label, error }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassoword = () => {
    setHidePassword(!hidePassword);
  };
  return (
    <div className="mt-3">
      {name === "password" ? (
        <div className="d-flex justify-content-between align-items-center resizeWidth w-100 ">
          <label htmlFor={type} className="label">
            {label}
          </label>
          <p onClick={togglePassoword} className="m-0 p-0 cursor text-muted">
            {hidePassword ? (
              <>
                <FiEye />
                <span> show</span>
              </>
            ) : (
              <>
                <FiEyeOff />
                <span> hide</span>
              </>
            )}
          </p>
        </div>
      ) : (
        <label htmlFor={type} className="label">
          {label}
        </label>
      )}
      <Field
        type={type === "password" ? (hidePassword ? "password" : "text") : ""}
        name={name}
        className={`inputField ${error ? "error" : null} `}
      />
      <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
  );
};

export default FormikField;
