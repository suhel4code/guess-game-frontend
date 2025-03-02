import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../context/User";
import Stats from "./Stats";
import Loader from "./Loader";

const Invite = () => {
  const { logout, login } = useUser();
  const [searchParams] = useSearchParams();
  const invitedByUser = searchParams.get("user");
  const newUser = searchParams.get("invitedUser");
  const [currentUserStats, setCurrentUserStats] = useState({
    name: "",
    totalPlay: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function getuser() {
    try {
      const [userStats, statsForNewUser] = await Promise.all([
        axiosInstance.get("/users/" + invitedByUser),
        axiosInstance.get("/users/" + newUser),
      ]);
      setCurrentUserStats({
        name: invitedByUser,
        totalPlay: userStats.totalPlay,
        correctAnswer: userStats.correctAnswer,
        wrongAnswer: userStats.wrongAnswer,
      });
      const user = {
        name: statsForNewUser.name,
        totalPlay: statsForNewUser.totalPlay,
        correctAnswer: statsForNewUser.correctAnswer,
        wrongAnswer: statsForNewUser.wrongAnswer,
      };
      login(user);
    } catch (error) {
      console.error("Error while getting in:", error);
    }
  }

  useEffect(() => {
    getuser();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" color="primary">
        You've Been Challenged by {invitedByUser} whose stats are
      </Typography>
      {invitedByUser && <Stats currentUser={currentUserStats} />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center vertically
          height: "100px", // Set a fixed height
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Play Now
        </Button>
      </Box>
      <Loader open={isLoading} />
    </Container>
  );
};

export default Invite;
