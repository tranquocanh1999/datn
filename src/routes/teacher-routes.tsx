/**
 * Copyright HMS. 2022. All Rights Reserved.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import ClassList from "../views/teacher/class/class-list";
import QuestionList from "../views/teacher/questions/question-list";
import { role } from "../contants/role";
import { TeacherLayout } from "../layouts/teacher-layout";
import NotFound from "../views/common/not-found";

const TeacherRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/class" replace />} />
        <Route
          path="/class"
          element={
            <PrivateRoute
              path="/class"
              Component={ClassList}
              requiredRoles={[role.TEACHER]}
            />
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute
              path="/questions"
              Component={QuestionList}
              requiredRoles={[role.TEACHER]}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
