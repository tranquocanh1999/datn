import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import "./App.scss";
import { RootState } from "./app/rootReducer";
import { role } from "./contants/role";
import AuthRoutes from "./routes/auth-routes";
import TeacherRoutes from "./routes/teacher-routes";

function App() {
  const roleUser = useSelector((state: RootState) => state?.user?.role);
  const open = useSelector((state: RootState) => state?.user?.loading)
    ? true
    : false;

  return (
    <>
      {roleUser === 0 && <AuthRoutes />}
      {roleUser === role.TEACHER && <TeacherRoutes />}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default App;
