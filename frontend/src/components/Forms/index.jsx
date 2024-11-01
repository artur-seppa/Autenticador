import { React, useContext, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { AuthContext } from "../../context/AuthContext";

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const Forms = ({ onClose }) => {
  const { addItem } = useContext(FinanceContext);
  const { user } = useContext(AuthContext);

  const data_user = typeof user === "string" ? JSON.parse(user) : user;
  console.log(data_user.id);

  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [date, setDate] = useState(null);
  const [categoria, setCategoria] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dados = {
      descricao,
      tipo,
      valor: Number(valor),
      created_at: dayjs(date).tz("America/Sao_Paulo").toISOString(),
      categoria,
      userId: data_user.id,
    };

    const response = await addItem(dados);

    if (response) {
      Swal.fire("Incluido !", "Item adicionado com sucesso.", "success");
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Descrição"
          variant="outlined"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Tipo"
          variant="outlined"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Valor"
          variant="outlined"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DatePicker"]}
          sx={{ width: "100%", mb: 2 }}
        >
          <DatePicker
            label="Data"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            format="DD/MM/YYYY"
            fullWidth
            sx={{ width: "100%" }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Categoria</InputLabel>
        <Select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          label="Categoria"
        >
          <MenuItem value="entrada">Entrada</MenuItem>
          <MenuItem value="saida">Saída</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}></FormControl>
      <Button type="submit" variant="contained" color="primary">
        Adicionar
      </Button>
      <Button
        onClick={() => onClose()}
        variant="outlined"
        color="error"
        sx={{ ml: 2 }}
      >
        Cancelar
      </Button>
    </form>
  );
};
