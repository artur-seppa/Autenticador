import React from "react";
import "./styles.css";
import ResumeItem from "../ResumeItem";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";

export const Resume = () => {
  return (
    <div className="resume_container">
      <ResumeItem title="Entradas" value={100} Icon={FaRegArrowAltCircleUp} />
      <ResumeItem title="Saídas" value={100} Icon={FaRegArrowAltCircleDown} />
      <ResumeItem title="Total" value={100} Icon={FaDollarSign} />
    </div>
  );
};
