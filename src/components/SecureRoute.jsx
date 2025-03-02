// SecureRoute.js
import { Navigate } from "react-router-dom";
import { useUser } from "../context/User";
import Layout from "./Layout"; // Assuming you move Layout to a separate file

export default function SecureRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
}
