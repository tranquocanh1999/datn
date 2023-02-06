import yup from "../config/yup";

export const competitionFormSchema = yup.object({
  code: yup.string().label("Mã bài thi").max(100).required(),
  title: yup.string().label("Tiêu đề").max(255).required(),
  numberOfQuestionLv1: yup
    .number()
    .label("Số lượng câu hỏi")
    .when("hasQuestionLv1", {
      is: (value: any) => value,
      then: yup.number().min(1).max(100).required(),
    }),
  numberOfExam: yup
    .number()
    .label("Số lượng câu hỏi")
    .min(1)
    .max(100)
    .required(),
  numberOfQuestionLv2: yup
    .number()
    .label("Số lượng câu hỏi")
    .when("hasQuestionLv2", {
      is: (value: any) => value,
      then: yup.number().min(1).max(100).required(),
    }),
  numberOfQuestionLv3: yup
    .number()
    .label("Số lượng câu hỏi")

    .when("hasQuestionLv3", {
      is: (value: any) => value,
      then: yup.number().min(1).max(100).required(),
    }),
  numberOfQuestionLv4: yup
    .number()
    .label("Số lượng câu hỏi")
    .when("hasQuestionLv4", {
      is: (value: any) => value,
      then: yup.number().min(1).max(100).required(),
    }),
});
