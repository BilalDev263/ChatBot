import React from "react";
import styles from "@/styles/Home.module.css"; 

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default Button;

