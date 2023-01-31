import yup from "../config/yup";

export const classFormSchema = yup.object({
  className: yup.string().label("Tên lớp học").max(255).required(),
  description: yup.string().label("Mô tả").max(255),
});
