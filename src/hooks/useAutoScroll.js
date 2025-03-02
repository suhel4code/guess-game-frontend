import { useEffect, useRef } from "react";

// Custom hook for auto-scrolling
const useAutoScroll = (dependencies = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // console.log("effect runs");
    if (containerRef.current) {
      // Scroll to the bottom of the container
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, dependencies); // Re-run effect when dependencies change

  return containerRef;
};

export default useAutoScroll;
