import { React, useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { format } from "date-fns";

import { ChartContainer } from "@mui/x-charts/ChartContainer";
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

export const DashboardLine = ({ Icon_theme, category }) => {
  const { data } = useContext(FinanceContext);

  // Verifique se data e data.financas estão definidos
  const dados = Array.isArray(data.financas)
    ? data.financas
        .filter((item) => {
          return category === "total"
            ? true
            : !category || item.categoria === category;
        })
        .map((item) => ({
          id: item.id_financas,
          descricao: item.descricao,
          categoria: item.categoria,
          valor: item.valor,
          tipo: item.tipo,
          data: format(new Date(item.created_at), "dd/MM/yyyy"),
        }))
    : [];

  const pData = dados.map((item) => item.valor); // Extrai os valores financeiros
  const xLabels = dados.map((item) => item.data); // Extrai as datas formatadas

  return (
    <ChartContainer
      width={300}
      height={140}
      series={[{ type: "line", data: pData }]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          stroke: Icon_theme,
          strokeWidth: 2,
        },
        [`& .${markElementClasses.root}`]: {
          stroke: Icon_theme,
          scale: "0.6",
          fill: "#fff",
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
};
