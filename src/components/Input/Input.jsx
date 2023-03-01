import React from "react";
import "./Input.less";

const Input = ({ value, setValue, type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export default Input;
