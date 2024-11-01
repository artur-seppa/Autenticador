import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField"; // Importa o TextField para o formulário
import { Forms } from "../Forms";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid gray",
  borderRadius: "8px",
  p: 4,
};

export const ModalForms = ({onClose}) => {
  return (
    <Modal
      open={true} // O modal será aberto quando renderizado
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          Adicionar Item
        </Typography>

        <Forms onClose={onClose}/>
      </Box>
    </Modal>
  );
};
