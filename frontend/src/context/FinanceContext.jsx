import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api/api";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("@Auth:user"));
        const response = await api.post("/finance/search", user.id);
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  const addItem = async (data) => {
    // setData((prevData) => [...prevData, newItem]);

    const response = await api.post("/finance", data);

    if (response.status === 200) {
      let newTotal = data.total;
      let newTotalEntrada = data.totalEntrada;
      let newTotalSaida = data.totalSaida;

      switch (data.categoria) {
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
        financas: (prevData) => [...prevData, data],
      }));

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
      value={{ data, setData, error, addItem, removeItem }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
