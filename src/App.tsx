import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import { RootState } from "./app/rootReducer";
import { role } from "./shared/contants/role";
import AuthRoutes from "./routes/auth-routes";
import TeacherRoutes from "./routes/teacher-routes";

function App() {
  const [openToast, setOpenToast] = useState(false);
  const roleUser = useSelector((state: RootState) => state?.user?.role);
  const open = useSelector((state: RootState) => state?.user?.loading)
    ? true
    : false;
  const toast = useSelector((state: RootState) => state?.user?.toast);

  useEffect(() => {
    if (toast.message) {
      setOpenToast(true);
    }
  }, [toast]);

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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={5000}
        open={openToast}
        onClose={() => {
          setOpenToast(false);
        }}
        key="top_right"
      >
        <Alert
          onClose={() => {
            setOpenToast(false);
          }}
          severity={toast?.type || "info"}
          sx={{ width: "100%" }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
