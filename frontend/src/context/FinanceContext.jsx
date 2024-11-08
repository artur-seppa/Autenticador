import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api/api";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("@Auth:user"));
        const response = await api.post("/finance/search", user.id);
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const addItem = async (values) => {
    const response = await api.post("/finance", values);
    const financa = response.data.financa;

    if (response.status === 200) {
      let newTotal = data.total;
      let newTotalEntrada = data.totalEntrada; // Inicialize com o valor atual
      let newTotalSaida = data.totalSaida; // Inicialize com o valor atual
      const valor = financa.valor;

      switch (values.categoria) {
        case "entrada":
          newTotal += valor; // Adiciona valor ao total
          newTotalEntrada += valor; // Adiciona valor a entrada
          break;
        case "saida":
          newTotal -= valor; // Subtrai valor do total
          newTotalSaida += valor; // Adiciona valor a saída
          break;
      }

      setData((prevData) => {
        const updatedFinancas = [...prevData.financas, financa];

        updatedFinancas.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        return {
          ...prevData,
          total: newTotal,
          totalEntrada: newTotalEntrada,
          totalSaida: newTotalSaida,
          financas: updatedFinancas,
        };
      });

      return true;
    } else {
      return response.data.error;
    }
  };

  const removeItem = async (id_financas, categoria, valor) => {
    const response = await api.post("/finance/delete", { id_financas });

    if (response.status === 200) {
      let newTotal = data.total;
      let newTotalEntrada = data.totalEntrada; // Inicialize com o valor atual
      let newTotalSaida = data.totalSaida; // Inicialize com o valor atual

      switch (categoria) {
        case "entrada":
          newTotal -= valor;
          newTotalEntrada -= valor;
          break;
        case "saida":
          newTotal += valor;
          newTotalSaida -= valor;
          break;
        default:
          break;
      }

      setData((prevData) => ({
        ...prevData,
        total: newTotal,
        totalEntrada: newTotalEntrada,
        totalSaida: newTotalSaida,
        financas: prevData.financas.filter(
          (item) => item.id_financas !== id_financas
        ),
      }));

      return true;
    } else {
      return response.data.error;
    }
  };

  return (
    <FinanceContext.Provider
      value={{ data, setData, addItem, removeItem }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
