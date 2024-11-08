import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FinanceContext } from "../../context/FinanceContext";
import { format } from "date-fns";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Box } from "@mui/material";
import Swal from "sweetalert2";

import { FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";
import { ModalForms } from "../ModalForms";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, removeItem } = useContext(FinanceContext);

  const rows = Array.isArray(data.financas)
    ? data.financas.map((item) => ({
        id: item.id_financas,
        descricao: item.descricao,
        tipo: item.tipo,
        valor: item.valor,
        data: format(new Date(item.created_at), "dd/MM/yyyy"),
        categoria: item.categoria,
      }))
    : [];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDelete = async (id_financas, categoria, valor) => {
    const result = await Swal.fire({
      title: "Deseja mesmo deletar o item?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "black",
      confirmButtonText: "Deletar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const response = await removeItem(id_financas, categoria, valor);

      if (response) {
        Swal.fire("Deletado!", "Item deletado com sucesso.", "success");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "descricao", headerName: "Descrição", flex: 2 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    { field: "valor", headerName: "Valor (R$)", type: "number", flex: 1.5 },
    { field: "data", headerName: "Data", type: "Date", flex: 1 },
    {
      field: "categoria",
      headerName: "Categoria",
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color:
              params.value === "entrada"
                ? "hsl(120, 61%, 77%)"
                : "hsl(0, 94%, 80%)",
          }}
        >
          {params.value === "entrada" ? (
            <FaRegArrowAltCircleUp size={20} /> // Ajuste o tamanho conforme desejado
          ) : (
            <FaRegArrowAltCircleDown size={20} />
          )}
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Ação",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <IconButton
            onClick={() =>
              handleDelete(
                params.row.id,
                params.row.categoria,
                params.row.valor
              )
            }
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

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

        <IconButton onClick={() => setIsModalOpen(true)} color="primary">
          <AddIcon />
        </IconButton>

        {isModalOpen && ( // Renderiza o modal condicionalmente
          <ModalForms onClose={() => setIsModalOpen(false)} />
        )}
      </Box>

      <Paper sx={{ height: 400, width: "100%", position: "relative" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </ThemeProvider>
  );
};
