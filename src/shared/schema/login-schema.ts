import yup from "../config/yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .label("Tên đăng nhập")
    .required("Tên đăng nhâp không được để trống"),
  password: yup
    .string()
    .label("Mật khẩu")
    .min(8)
    .required("Mật khẩu không được để trống"),
});
