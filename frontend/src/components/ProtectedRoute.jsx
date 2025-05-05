// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="text-center text-yellow-400 mt-10">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
