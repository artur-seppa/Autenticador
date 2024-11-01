import { React, useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { ResumeItem } from "../ResumeItem";
import Box from "@mui/material/Box";

import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign,
} from "react-icons/fa";

export const Resume = () => {
  const { data } = useContext(FinanceContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // "column" em telas pequenas, "row" em maiores
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "33%" },
          marginRight: { xs: 0, sm: 2 },
          marginBottom: { xs: 2 },
        }}
      >
        <ResumeItem
          title="Entradas"
          category="entrada"
          value={data.totalEntrada}
          Icon={FaRegArrowAltCircleUp}
          Icon_theme={"hsl(120, 61%, 77%)"}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "33%" },
          marginBottom: { xs: 2 },
        }}
      >
        <ResumeItem
          title="Saídas"
          category="saida"
          value={data.totalSaida}
          Icon={FaRegArrowAltCircleDown}
          Icon_theme={"hsl(0, 94%, 80%)"}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "33%" },
          marginBottom: { xs: 2 },
          marginLeft: { xs: 0, sm: 2 },
        }}
      >
        <ResumeItem
          title="Total"
          category="total"
          value={data.total}
          Icon={FaDollarSign}
          Icon_theme={"hsl(220, 20%, 80%)"}
        />
      </Box>
    </Box>
  );
};
