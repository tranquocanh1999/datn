/**
 * Copyright HMS. 2022. All Rights Reserved.
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import ClassList from "../views/teacher/class/class-list";
import QuestionList from "../views/teacher/questions/question-list";
import { role } from "../shared/contants/role";
import { TeacherLayout } from "../layouts/teacher-layout";
import NotFound from "../views/common/not-found";
import StudentList from "../views/teacher/student/student-list";
import UserList from "../views/teacher/user/user-list";
import ExamList from "../views/teacher/exam/exam-list";
import ExamDetail from "../views/teacher/exam/exam-detail";

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
              requiredRoles={[role.TEACHER, role.ADMIN]}
            />
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute
              path="/questions"
              Component={QuestionList}
              requiredRoles={[role.TEACHER, role.ADMIN]}
            />
          }
        />
        <Route
          path="/students"
          element={
            <PrivateRoute
              path="/students"
              Component={StudentList}
              requiredRoles={[role.TEACHER, role.ADMIN]}
            />
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute
              path="/users"
              Component={UserList}
              requiredRoles={[role.TEACHER, role.ADMIN]}
            />
          }
        />
        <Route
          path="/exams"
          element={
            <PrivateRoute
              path="/exams"
              Component={ExamList}
              requiredRoles={[role.TEACHER, role.ADMIN]}
            />
          }
        />
        <Route
          path="/exam/:id"
          element={
            <PrivateRoute
              path="/exam/:id"
              Component={ExamDetail}
              requiredRoles={[role.TEACHER, role.ADMIN]}
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
