import { Outlet, useNavigate } from "react-router-dom";
import "./index.scss";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
export const TeacherLayout: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="sidebar">
        <div className="menu"></div>
        <div
          className="logout link"
          onClick={async () => {
            await dispatch<any>(logout());
            navigate("");
          }}
        >
          <div className="text">Đăng xuất</div>
          <LogoutOutlined />
        </div>
      </div>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
