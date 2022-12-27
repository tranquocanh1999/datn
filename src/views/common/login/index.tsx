import React from "react";
import FieldInput from "../../../components/input";
import { Button } from "@mui/material";
import { useFormik } from "formik";

import "./login.scss";
import { loginSchema } from "../../../shared/schema/login-schema";
import { useDispatch } from "react-redux";
import { login } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";
const Login: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await dispatch<any>(login(values));
      navigate("");
    },
  });

  return (
    <div className="login">
      <div className="form-login">
        <FieldInput
          name="username"
          label="Tên đăng nhâp"
          placeholder="Tên đăng nhâp"
          value={formik.values.username}
          onChange={formik.handleChange}
          errorText={(formik.touched.username && formik.errors.username) || ""}
          className="username"
        />
        <FieldInput
          name="password"
          label="Mật khẩu"
          placeholder="Mật khẩu"
          value={formik.values.password}
          onChange={formik.handleChange}
          errorText={(formik.touched.password && formik.errors.password) || ""}
          type="password"
        />
        <Button
          className="login-button"
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
export default Login;
