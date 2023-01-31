import { NavLink, Outlet, useNavigate } from "react-router-dom";
import style from "./index.module.scss";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";
import SettingsIcon from "@mui/icons-material/Settings";
import { Popover, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { RootState } from "../../app/rootReducer";
export const TeacherLayout: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const idToken = useSelector((state: RootState) => state?.user?.idToken) || "";

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const menu = [
    { url: "/class", title: "Danh sách lớp học" },
    { url: "/questions", title: "Ngân hàng câu hỏi" },
    { url: "/exams", title: "Ngân hàng đề thi" },
    { url: "/students", title: "Danh sách học sinh" },
    { url: "/users", title: "Danh sách nhân viên" },
  ];
  const menuBar = menu.map((link, index) => (
    <ToggleButton
      value="left"
      aria-label="left aligned"
      sx={{ height: "40px", padding: 0 }}
      key={index}
    >
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive && style.active} ${style.link}`
          }
          to={link.url}
        >
          {link.title}
        </NavLink>
      </li>
    </ToggleButton>
  ));
  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <div className={style.menu}>
          <nav>
            <ul>{menuBar}</ul>
          </nav>
        </div>
        <div
          className={`${style.logout} ${style.link}`}
          onClick={async () => {
            await dispatch<any>(logout(idToken));
            navigate("");
          }}
        >
          <div className={style.text}>Đăng xuất</div>
          <LogoutOutlined />
        </div>
      </div>
      <div className={style.content}>
        <div className={style.top}>
          <div onClick={handleClick} className="ml-auto">
            <SettingsIcon aria-describedby={id} />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>
              <div>
                <div className="text">Đổi mật khẩu</div>
              </div>
            </Typography>
          </Popover>
        </div>
        <div className={style.bottom}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
