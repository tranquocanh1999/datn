import yup from "../config/yup";

export const loginSchema = yup.object({
  username: yup.string().label("Tên đăng nhập").required(),
  password: yup.string().label("Mật khẩu").required(),
});
