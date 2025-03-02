import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Clues({ selectedDestination }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
        Clues for Selected Destination
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {selectedDestination.clues.map((clue, index) => (
          <Card
            key={index}
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": {
                boxShadow: 3, // Add hover effect
                transform: "translateY(-2px)", // Slight lift on hover
              },
              transition: "all 0.3s ease", // Smooth transition
            }}
          >
            <CardContent>
              <Typography variant="body1" color="text.primary">
                {clue}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
