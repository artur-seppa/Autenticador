import React, { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FinanceContext } from "../../context/FinanceContext";
import { format } from "date-fns";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography, Box } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const columns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "descricao", headerName: "Descrição", flex: 2 },
  { field: "categoria", headerName: "Categoria", flex: 1.5 },
  { field: "valor", headerName: "Valor", type: "number", flex: 1.5 },
  { field: "tipo", headerName: "Tipo", flex: 1 },
  { field: "data", headerName: "Data", type: "Date", flex: 1 },
  { field: "action", headerName: "Action", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

export const Table = () => {
  const { data } = useContext(FinanceContext);

  const handleDelete = (item) => {
    // Aqui você pode implementar a lógica para deletar os itens selecionados
    console.log(item);
    // Exemplo: Implementar lógica de exclusão com base nos IDs selecionados
  };

  const rows = Array.isArray(data.financas)
    ? data.financas.map((item) => ({
        id: item.id_financas,
        descricao: item.descricao,
        categoria: item.categoria,
        valor: item.valor,
        tipo: item.tipo,
        data: format(new Date(item.created_at), "dd/MM/yyyy"),
        action: (
          <IconButton onClick={handleDelete(item.id_financas)} color="error">
            <DeleteIcon />
          </IconButton>
        ),
      }))
    : [];

  const handleSelectionChange = (selection) => {
    console.log(selection);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Finanças</Typography>

        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <Paper sx={{ height: 400, width: "100%", position: "relative" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onCellClick={handleSelectionChange}
          // onCellModesModelChange={handleSelectionChange}
          // onColumnHeaderClick={handleSelectionChange}
          onClick={handleSelectionChange}
          sx={{ border: 0 }}
        />
      </Paper>
    </ThemeProvider>
  );
};
