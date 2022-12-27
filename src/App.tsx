import { useSelector } from "react-redux";
import "./App.scss";
import { RootState } from "./app/rootReducer";
import { role } from "./contants/role";
import AuthRoutes from "./routes/auth-routes";
import TeacherRoutes from "./routes/teacher-routes";

function App() {
  const roleUser = useSelector((state: RootState) => state?.user?.role);

  return (
    <>
      {roleUser === 0 && <AuthRoutes />}
      {roleUser === role.TEACHER && <TeacherRoutes />}
    </>
  );
}

export default App;
