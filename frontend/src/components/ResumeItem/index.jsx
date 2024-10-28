import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function OutlinedCard({ title, Icon, value }) {
  return (
    <Box sx={{ minWidth: 350 }}>
      <Card variant="outlined" sx={{ backgroundColor: "transparent", border: "1px solid white", color: "white" }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
            {title}
            <Box component="span" sx={{ display: "inline-block", ml: 1 }}>
              <Icon />
            </Box>
          </Typography>
          <Typography variant="h5" sx={{ mb: 1.5 }}>
            {value}
          </Typography>
          <Typography variant="body2">
            Últimos 30 dias.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}