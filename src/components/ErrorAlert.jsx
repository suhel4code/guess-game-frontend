import { Alert, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorAlert({ message, handleClose }) {
  return (
    <Alert
      severity={"error"}
      sx={{ mt: 2 }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => handleClose(null)}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {message}
    </Alert>
  );
}
