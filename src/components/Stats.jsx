import React from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Stats({ currentUser }) {
  const { name, totalPlay, correctAnswer, wrongAnswer } = currentUser;

  const stats = [
    { label: "Total Games Played", value: totalPlay, color: "text.primary" },
    { label: "Correct Answers", value: correctAnswer, color: "success.main" },
    { label: "Wrong Answers", value: wrongAnswer, color: "error.main" },
  ];

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item key={index} size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: stat.color }}>
                  {stat.label}
                </Typography>
                <Typography variant="h4" sx={{ color: "text.primary", mt: 1 }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
