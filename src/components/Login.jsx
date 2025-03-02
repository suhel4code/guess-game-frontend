import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useUser } from "../context/User";
import axiosInstance from "../api/axiosInstance";
import ErrorAlert from "./ErrorAlert";

export default function Login() {
  const { user, login } = useUser();
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false); // Track validation error
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Validate input field
  const validateInput = () => {
    if (name.trim() === "") {
      setIsError(true); // Show error if input is empty
      return false;
    }
    setIsError(false); // Clear error if input is valid
    return true;
  };

  async function handleLogin(isCreateUser = false) {
    if (!validateInput()) return; // Stop if input is invalid

    try {
      let res;
      if (isCreateUser) {
        const newUser = await axiosInstance.post("/users/register", {
          name: name,
        });
        res = newUser.user;
      } else {
        res = await axiosInstance.get("/users/" + name);
      }

      const user = {
        name: res.name,
        totalPlay: res.totalPlay,
        correctAnswer: res.correctAnswer,
        wrongAnswer: res.wrongAnswer,
      };
      login(user);
      setName("");
      navigate("/");
    } catch (error) {
      console.error("Error while logging in:", error);
      setLoginError(error?.response?.data?.message);
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        {/* Welcome Message */}
        <Typography
          variant="h4"
          color="primary"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Welcome to The Globetrotter Challenge
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          If you have an account, click on <strong>Login</strong>. Otherwise,
          click on <strong>Create User</strong> to get started.
        </Typography>

        {/* Input Field */}
        <TextField
          label="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          error={isError} // Show error state
          helperText={isError ? "Name cannot be empty" : ""} // Error message
        />

        {/* Buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogin(false)}
              sx={{ width: "150px" }}
              disabled={name.trim() === ""} // Disable if input is empty
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleLogin(true)}
              sx={{ width: "150px" }}
              disabled={name.trim() === ""} // Disable if input is empty
            >
              Create User
            </Button>
          </Grid>
        </Grid>
        {loginError && (
          <ErrorAlert
            message={loginError}
            handleClose={() => setLoginError(null)}
          />
        )}
      </Paper>
    </Container>
  );
}
