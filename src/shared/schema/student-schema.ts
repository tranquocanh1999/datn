import yup from "../config/yup";

export const studentFormSchema = yup.object({
  username: yup.string().label("Tên đăng nhập").max(100).required(),
  fullName: yup.string().label("Tên học sinh").max(255).required(),
  phoneNumber: yup
    .string()
    .label("Số điện thoại")
    .max(10)
    .required()
    .matches(/^[0-9]+$/, "Số điện thoại không được chứa kí tự"),
  email: yup.string().label("Email").email().max(255).required(),
  password: yup
    .string()
    .label("Mật khẩu")
    .min(8)
    .max(255)
    .when("isEdit", {
      is: (value: any) => !value,
      then: yup.string().required(),
    }),
  confirmPassword: yup
    .string()
    .label("Mật khẩu nhập lại")
    .when("password", {
      is: (value: any) => (value && value.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu nhập lại không khớp."),
    })
    .when("isEdit", {
      is: (value: any) => !value,
      then: yup.string().required(),
    }),
});
