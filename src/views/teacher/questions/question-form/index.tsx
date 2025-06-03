/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  ToggleButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import style from "./question-form.module.scss";
import { Close } from "@mui/icons-material";
import { answers, levels } from "../../../../shared/contants/question";
import MathEquation from "../../../../components/math/math-equation";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import SelectInput from "../../../../components/select";
import QuestionAnswer from "../../../../components/question-answer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import { getSubjectList } from "../../../../features/subjectSlice";
import { questionSchema } from "../../../../shared/schema/question-schema";
import {
  createQuestion,
  editQuestion,
  getQuestion,
} from "../../../../features/questionSlice";
import { setToast } from "../../../../features/userSlice";
import { typeToast } from "../../../../shared/contants/toast";
const QuestionForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state?.user?.toast);
  const success = useSelector((state: RootState) => state?.question?.isSuccess);
  const question = useSelector((state: RootState) => state?.question?.question);
  const [dataSuccess, setDataSuccess] = useState(true);

  const init = {
    content: "",
    subject: "",
    level: 1,
    choiceAnswers: [""],
    correctAnswer: 0,
    note: "",
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: questionSchema,
    onSubmit: (values) => {
      const value = {
        ...values,
        subject: { id: values.subject },
      };
      isEdit
        ? dispatch<any>(
            editQuestion({
              ...value,

              id: data.id,
            })
          )
        : dispatch<any>(
            createQuestion({
              ...value,
            })
          );
    },
  });

  useEffect(() => {
    if (toast.message) {
      handleClose();
    }
  }, [toast]);

  useEffect(() => {
    if (success) {
      dispatch(
        setToast({
          message: isEdit
            ? "Chỉnh sửa câu hỏi thành công."
            : "Thêm mới câu hỏi  thành công.",
          type: typeToast.SUCCESS,
        })
      );
    }
  }, [success]);

  useEffect(() => {
    if (question) {
      const data = {
        ...question,
        subject: question.subject?.id,
      };

      formik.setValues(data);
      setDataSuccess(true);
    }
  }, [question]);

  useEffect(() => {
    formik.resetForm();
    if (open) {
      dispatch<any>(getSubjectList());
      formik.setValues(init);
      if (isEdit) {
        dispatch<any>(getQuestion(data.id));
        setDataSuccess(false);
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

  useEffect(() => {
    if (subjects?.length) {
      formik.setFieldValue("subject", subjects[0].id);
    }
  }, [subjects]);

  const handleChangeAnswer = (e: any) => {
    formik.setFieldValue("choiceAnswers", e.choiceAnswers);
    formik.setFieldValue("correctAnswer", e.correctAnswer);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={"xl"}
    >
      <DialogTitle className={style.form_title}>
        <div>{isEdit ? "Chỉnh sửa câu hỏi" : "Thêm mới câu hỏi"}</div>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{ border: "none", padding: 0 }}
        >
          <Close onClick={handleClose} />
        </ToggleButton>
      </DialogTitle>
      <DialogContent className={style.form_content}>
        <div
          className={`${style.form} mt-0`}
          style={{
            borderRight: `2px solid ${grey[600]}`,
            padding: "0 16px 0 0",
            marginRight: "16px",
          }}
        >
          <FieldInput
            name="content"
            label="Nội dung câu hỏi"
            placeholder="Nội dung câu hỏi"
            value={formik.values.content}
            onChange={formik.handleChange}
            errorText={(formik.touched.content && formik.errors.content) || ""}
            className="content"
            row={4}
            required
          />
          <br />
          <SelectInput
            name="subject"
            label="Môn học"
            value={formik.values.subject}
            onChange={formik.handleChange}
            errorText={(formik.touched.subject && formik.errors.subject) || ""}
          >
            {subjects?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </SelectInput>
          <br />
          <SelectInput
            name="level"
            label="Độ khó"
            value={formik.values.level}
            onChange={formik.handleChange}
            data={levels}
            errorText={(formik.touched.level && formik.errors.level) || ""}
          >
            {levels?.map((text: string, index: number) => (
              <MenuItem key={index + 1} value={index + 1}>
                {text}
              </MenuItem>
            ))}
          </SelectInput>
          <br />

          {open && dataSuccess && (
            <>
              <QuestionAnswer
                name="answer"
                label="Đáp án"
                value={formik.values.correctAnswer}
                onChange={handleChangeAnswer}
                data={formik.values.choiceAnswers}
                errorText={
                  formik.touched.choiceAnswers &&
                  formik.errors.choiceAnswers?.length
                    ? "Đáp án không được để trống"
                    : ""
                }
                isEdit={true}
              />
              <br />
            </>
          )}
          <FieldInput
            name="note"
            label="Lời giải"
            placeholder="Lời giải"
            value={formik.values.note}
            onChange={formik.handleChange}
            errorText={(formik.touched.note && formik.errors.note) || ""}
            className="note"
            row={4}
          />
        </div>
        <div className={style.review}>
          <h4 className="text-center">Xem trước:</h4>
          <div className={style.title}>Đề bài:</div>
          {open ? <MathEquation value={formik.values.content} /> : ""}

          <ol type="A" style={{ padding: "0 16px" }}>
            {formik.values?.choiceAnswers?.map(
              (answer: string, index: number) => (
                <li key={index}>
                  {open ? <MathEquation value={answer} /> : ""}
                </li>
              )
            )}
          </ol>
          <div className={style.title}>Đáp án:</div>
          {answers[formik.values?.correctAnswer]}

          <div className={style.title}>Lời giải:</div>
          {open ? <MathEquation value={formik.values.note} /> : ""}
        </div>
      </DialogContent>
      <DialogActions className={style.form_action}>
        <Button onClick={handleClose} variant="outlined">
          Thoát
        </Button>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
        >
          {isEdit ? "Chỉnh sửa" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(QuestionForm, (pre, next) => {
  return pre.open === next.open;
});
