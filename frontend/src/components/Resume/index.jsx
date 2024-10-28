import React from "react";
import "./styles.css";
import ResumeItem from "../ResumeItem";
import Box from "@mui/material/Box";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";

export const Resume = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // "column" em telas pequenas, "row" em maiores
        alignItems: { xs: "center", sm: "space-around" },
        width: "100%", // Garante que ocupe toda a largura disponível
        justifyContent: "center",
        gap: 3,
      }}
    >
      <ResumeItem
        title="Entradas"
        value={100}
        Icon={FaRegArrowAltCircleUp}
        Icon_theme={"hsl(120, 61%, 77%)"}
      />
      <ResumeItem
        title="Saídas"
        value={100}
        Icon={FaRegArrowAltCircleDown}
        Icon_theme={"hsl(0, 94%, 80%)"}
      />
      <ResumeItem
        title="Total"
        value={100}
        Icon={FaDollarSign}
        Icon_theme={"hsl(220, 20%, 80%)"}
      />
    </Box>
  );
};
