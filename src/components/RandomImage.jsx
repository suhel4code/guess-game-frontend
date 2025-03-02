import { useState } from "react";
import { Skeleton, Box } from "@mui/material";

export default function RandomImage() {
  const [loaded, setLoaded] = useState(false);

  const randomImageUrl = `https://picsum.photos/200?random=${Math.floor(
    Math.random() * 1000
  )}`;

  return (
    <Box
      sx={{
        width: "100%", // Ensure the Box takes full width
        height: "200px", // Fixed height (adjust as needed)
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width="100%" // Skeleton takes full width
          height="100%" // Skeleton takes full height
        />
      )}

      <img
        src={randomImageUrl}
        alt={"random person"}
        style={{
          display: loaded ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
}
