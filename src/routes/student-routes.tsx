/**
 * Copyright HMS. 2022. All Rights Reserved.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import { role } from "../shared/contants/role";
import NotFound from "../views/common/not-found";
import { StudentLayout } from "../layouts/student-layout";
import ExamList from "../views/student/exam/exam-list";
import ExamDetail from "../views/student/exam/exam-detail";

const StudentRoutes: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<StudentLayout />}>
        <Route index element={<Navigate to="/exams" replace />} />
        <Route
          path="/exams"
          element={
            <PrivateRoute
              path="/exams"
              Component={ExamList}
              requiredRoles={[role.STUDENT]}
            />
          }
        />
        <Route
          path="/exam/:id"
          element={
            <PrivateRoute
              path="/exam/:id"
              Component={ExamDetail}
              requiredRoles={[role.STUDENT]}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
