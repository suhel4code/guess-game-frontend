import React, { useEffect, useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  Button,
  Alert,
  Box,
  Pagination,
  IconButton,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useUser } from "../context/User";
import Stats from "./Stats";
import Loader from "./Loader";
import Clues from "./Clues";
import Answer from "./Answer";
import CloseIcon from "@mui/icons-material/Close";
import useAutoScroll from "../hooks/useAutoScroll";

const pageSize = 10;

const Game = () => {
  const { user } = useUser();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [currentUserStats, setCurrentUserStats] = useState({
    name: "",
    totalPlay: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useAutoScroll([feedback]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const fetchDestinations = async (pageNumber) => {
    setIsLoading(true);
    try {
      const [res, userStats] = await Promise.all([
        axiosInstance.get("/destinations?page=" + pageNumber),
        await axiosInstance.get("/users/" + user.name),
      ]);
      setDestinations(res.destinations);
      setTotalPages(res.totalPages);
      setCurrentUserStats({
        name: user.name,
        totalPlay: userStats.totalPlay,
        correctAnswer: userStats.correctAnswer,
        wrongAnswer: userStats.wrongAnswer,
      });
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations(page);
  }, [page]);

  // Handle user selection from dropdown
  const handleSelectDestination = (event) => {
    const selected = destinations.find(
      (dest) => dest.alias === event.target.value
    );
    setSelectedDestination(selected);
    setFeedback(null);

    if (selected) {
      let options = destinations.map((dest) => dest.name);
      options = shuffleArray(options).slice(0, 5); // Pick 3 random destinations
      if (!options.includes(selected.name)) {
        options[Math.floor(Math.random() * options.length)] = selected.name; // Ensure correct answer is included
      }
      setShuffledOptions(shuffleArray(options));
    }
  };

  const handleCheckAnswer = async () => {
    if (!selectedDestination || !selectedAnswer) return;
    let guessRes = selectedAnswer === selectedDestination.name;
    setIsLoading(true);
    try {
      const updatedRes = await axiosInstance.put("/users/update", {
        name: user.name,
        correct: guessRes ? 1 : 0,
        wrong: guessRes ? 0 : 1,
      });
      if (guessRes) {
        setFeedback({
          type: "success",
          message: `🎉 Correct! Fun Fact: ${selectedDestination.funFacts[0]}`,
        });
      } else {
        setFeedback({
          type: "error",
          message: `😢 Incorrect! But here's something interesting: ${selectedDestination.funFacts[0]}`,
        });
      }
      setCurrentUserStats({
        name: user.name,
        totalPlay: updatedRes.user.totalPlay,
        correctAnswer: updatedRes.user.correctAnswer,
        wrongAnswer: updatedRes.user.wrongAnswer,
      });
    } catch (error) {
      console.error("Error while updating the answer", error);
    } finally {
      setIsLoading(false);
    }
  };

  function handlePageChange(value) {
    setPage(value);
    setSelectedDestination(null);
    setSelectedAnswer(null);
    setFeedback(null);
    setShuffledOptions([]);
  }

  const handlePlayAgain = () => {
    if (destinations.length === 0) return;

    // Select a new random destination
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const newDestination = destinations[randomIndex];
    setSelectedDestination(newDestination);
    setFeedback(null);
    setSelectedAnswer("");

    // Update shuffled options for the new destination
    let options = destinations.map((dest) => dest.name);
    options = shuffleArray(options).slice(0, 5); // Pick 5 random destinations
    if (!options.includes(newDestination.name)) {
      options[Math.floor(Math.random() * options.length)] = newDestination.name; // Ensure correct answer is included
    }
    setShuffledOptions(shuffleArray(options));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Stats currentUser={currentUserStats} />

      {/* Destination Dropdown */}
      {destinations.length > 0 && (
        <Select
          value={selectedDestination?.alias || ""}
          onChange={handleSelectDestination}
          displayEmpty
          fullWidth
          sx={{ mb: 3, mt: 3 }}
        >
          <MenuItem value="" disabled>
            Select a destination to get started
          </MenuItem>
          {destinations.map((dest) => (
            <MenuItem key={dest.alias} value={dest.alias}>
              {dest.alias}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Display Clues */}
      {selectedDestination && (
        <>
          <Clues selectedDestination={selectedDestination} />
          <Answer
            shuffledOptions={shuffledOptions}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            handleCheckAnswer={handleCheckAnswer}
          />
        </>
      )}
      {feedback && (
        <Alert
          severity={feedback.type}
          sx={{ mt: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setFeedback(null)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {feedback.message}
        </Alert>
      )}
      {selectedAnswer && (
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {/* Next Destination - Load a different random destination */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePlayAgain}
          >
            Play again
          </Button>

          {/* Fresh Start - Reset everything */}
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setPage(1); // Reset to first page
              setSelectedDestination(null);
              setSelectedAnswer("");
              setFeedback(null);
              setShuffledOptions([]);
            }}
          >
            Fresh Start
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mt: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => handlePageChange(value)}
          color="primary"
        />
      </Box>
      <Loader open={isLoading} />
    </Container>
  );
};

export default Game;
