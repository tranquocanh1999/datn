/**
 * Copyright HMS. 2022. All Rights Reserved.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/common/login";
import NotFound from "../views/common/not-found";

const AuthRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
