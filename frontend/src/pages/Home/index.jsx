import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Resume } from "../../components/Resume";
import { Header } from "../../components/Header";
import Table from "../../components/Table";

export const Home = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111" }}>
      <Header />

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
          paddingTop: "25px", // Espaço para a navbar
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "94%",
            height: "auto",
            maxHeight: "none",
            backgroundColor: "transparent",
            border: "1px solid #424242",
            color: "white",
          }}
        >
          <CardContent>
            <Table />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

// import * as React from "react";
// import Container from "@mui/material/Container";

// import { Header } from "../../components/Header";
// import { Resume } from "../../components/Resume";
// import { Table } from "../../components/Table";
// import "./styles.css";

// export const Home = () => {
//   return (
//     <div className="container">
//       <Header />
//       <div className="container-home">
//         <Resume />
//         <Table />
//       </div>
//     </div>

//     // <div className="container">
//     // <Header />
//     // <Resume />
//     // <br />
//     // <Table />
//     // </div>
//   );
// };
