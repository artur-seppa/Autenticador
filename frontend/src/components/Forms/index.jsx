import React, { useContext } from "react";
import { Box, TextField, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import dayjs from "dayjs";

export const Forms = ({ onClose }) => {
  const { addItem } = useContext(FinanceContext);

  const [descricao, setDescricao] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [valor, setValor] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [categoria, setCategoria] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dados = { descricao, tipo, valor, data, categoria };
    await addItem(dados);

    onClose(); // Fecha o modal após o envio
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Descrição"
        variant="outlined"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        sx={{ mb: 2 }} // Margem inferior
      />
      <TextField
        fullWidth
        label="Tipo"
        variant="outlined"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        sx={{ mb: 2 }} // Margem inferior
      />

      <TextField
        fullWidth
        label="Valor"
        variant="outlined"
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        sx={{ mb: 2 }} // Margem inferior
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          width: "100%",
          mb: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Data"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <TextField
        fullWidth
        label="Categoria"
        variant="outlined"
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        sx={{ mb: 2 }}
      />

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
