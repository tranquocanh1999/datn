import yup from "../config/yup";

export const questionSchema = yup.object({
  content: yup.string().label("Nội dung câu hỏi").required(),
  choiceAnswers: yup.array(yup.string().label("Đáp án").required()),
});
