import React from "react";
import "./styles.css";

const ResumeItem = ({ title, Icon, value }) => {
  return (
    <div className="card">
      <div className="header">
        <h3 className="title">{title}</h3>
        <Icon />
      </div>
      <span className="total">{value}</span>
    </div>
  );
};

export default ResumeItem;
