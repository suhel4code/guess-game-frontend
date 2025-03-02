import { Navigate, Route, Routes } from "react-router-dom";
import SecureRoute from "./components/SecureRoute"; // Import the SecureRoute component
import Login from "./components/Login";
import Game from "./components/Game";
import Invite from "./components/Invite";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <SecureRoute>
            <Game />
          </SecureRoute>
        }
      />
      <Route
        path="/invite"
        element={
          <SecureRoute>
            <Invite />
          </SecureRoute>
        }
      />

      {/* Catch-all Route (Redirect to Home if Page Not Found) */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
