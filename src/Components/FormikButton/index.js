import React from "react";
import "./style.css";
const index = ({type,title}) => {
  return <button className="formikButton mt-5 "type={type}>{title}</button>;
};

export default index;
