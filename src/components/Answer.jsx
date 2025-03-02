import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";

export default function Answer({
  selectedAnswer,
  setSelectedAnswer,
  shuffledOptions,
  handleCheckAnswer,
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
      {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small"> */}
      <Select
        value={selectedAnswer || ""}
        onChange={(event) => setSelectedAnswer(event.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>
          Select Your Answer
        </MenuItem>
        {shuffledOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {/* </FormControl> */}

      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckAnswer}
        disabled={!selectedAnswer}
      >
        Check Answer
      </Button>
    </Box>
  );
}
