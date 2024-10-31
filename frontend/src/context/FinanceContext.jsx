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

  const addItem = (newItem) => {
    setData((prevData) => [...prevData, newItem]);
  };

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <FinanceContext.Provider value={{ data, error, addItem, removeItem }}>
      {children}
    </FinanceContext.Provider>
  );
};
