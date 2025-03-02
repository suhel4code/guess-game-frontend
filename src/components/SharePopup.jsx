import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useUser } from "../context/User";
import RandomImage from "./RandomImage";
import CloseIcon from "@mui/icons-material/Close";

function SharePopup({ open, onClose, inviteLink }) {
  const { user } = useUser();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Copy the invite link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  // Open WhatsApp with the invite link
  const handleShareOnWhatsApp = () => {
    const message = `Hey! I scored ${user.totalPlay} in the Globetrotter Challenge! Can you beat my score? Try it now: ${inviteLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Close the Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Share Challenge
            <IconButton onClick={onClose} sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: "center" }}>
            <RandomImage />
            <Typography variant="body1" sx={{ mt: 2, wordBreak: "break-all" }}>
              {inviteLink}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          {/* Copy Link Button */}
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
          {/* Share on WhatsApp Button */}
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            onClick={handleShareOnWhatsApp}
            sx={{ ml: 2 }}
          >
            Share on WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // Auto-close after 3 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}

export default SharePopup;
