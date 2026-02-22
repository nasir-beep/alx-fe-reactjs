import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ useAuth import

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); // ✅ useAuth usage

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
