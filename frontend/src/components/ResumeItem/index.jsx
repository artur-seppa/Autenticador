import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DashboardLine } from "../DashboardLine";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const ResumeItem = ({ title, Icon, Icon_theme, value }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "transparent",
        border: "1px solid #424242",
        color: "white",
        paddingBottom: 0,
        marginBottom: 0
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <Box component="span" sx={{ display: "inline-block", ml: 1 }}>
            <Icon style={{ color: Icon_theme }} />
          </Box>
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {value}
        </Typography>
        <Typography variant="body2">Últimos 30 dias.</Typography>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DashboardLine Icon_theme={Icon_theme}/>
        </Box>
      </CardContent>
    </Card>
  );
};
