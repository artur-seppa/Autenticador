import { react, useReducer, useContext, useEffect } from "react";
import { FinanceProvider } from "../../context/FinanceContext";

import { Container, Box, Card, CardContent } from "@mui/material";

import { Resume } from "../../components/Resume";
import { Header } from "../../components/Header";
import { Table } from "../../components/Table";

export const Home = () => {
  return (
    <FinanceProvider>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#111" }}>
        <Header />

        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "80px", // Espaço para a navbar
            }}
          >
            <Resume />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                border: "1px solid #424242",
                color: "white",
                marginBottom: 2,
              }}
            >
              <CardContent>
                <Table />
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </FinanceProvider>
  );
};
