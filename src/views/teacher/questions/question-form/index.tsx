/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import style from "./question-form.module.scss";
import { Close } from "@mui/icons-material";
import {
  answers,
  levels,
  questionTypes,
  subjects,
} from "../../../../contants/question";
import MathEquation from "../../../../components/math/math-equation";
import { grey } from "@mui/material/colors";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import { classFormSchema } from "../../../../shared/schema/class-schema";
import SelectInput from "../../../../components/select";
import QuestionAnswer from "../../../../components/question-answer";
const QuestionForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const init = {
    content: "",
    type: 1,
    subject: 0,
    level: 0,
    choice_answers: [""],
    correct_answers: [],
    note: "",
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: classFormSchema,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    formik.resetForm();
    if (open) {
      if (isEdit) {
        formik.setValues(data);
      } else {
        formik.setValues(init);
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

  const handleChangeAnswer = (e: any) => {
    formik.setFieldValue("choice_answers", e.choice_answers);
    formik.setFieldValue("correct_answers", e.correct_answers);
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
            name="type"
            label="Loại câu hỏi"
            value={formik.values.type}
            onChange={formik.handleChange}
            data={questionTypes}
            errorText={(formik.touched.type && formik.errors.type) || ""}
          />
          <br />
          <SelectInput
            name="subject"
            label="Môn học"
            value={formik.values.subject}
            onChange={formik.handleChange}
            data={subjects}
            errorText={(formik.touched.subject && formik.errors.subject) || ""}
          />{" "}
          <br />
          <SelectInput
            name="level"
            label="Độ khó"
            value={formik.values.level}
            onChange={formik.handleChange}
            data={levels}
            errorText={(formik.touched.level && formik.errors.level) || ""}
          />
          <br />
          {((formik.values.choice_answers.length > 1 && isEdit) || !isEdit) &&
            !formik.values.type &&
            open && (
              <>
                <QuestionAnswer
                  name="answer"
                  label="Đáp án"
                  value={formik.values.correct_answers}
                  onChange={handleChangeAnswer}
                  data={formik.values.choice_answers}
                  errorText={
                    (formik.touched.subject && formik.errors.subject) || ""
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

          {!formik.values.type && (
            <>
              <ol type="A" style={{ padding: "0 16px" }}>
                {formik.values?.choice_answers.map(
                  (answer: string, index: number) => (
                    <li key={index}>
                      {open ? <MathEquation value={answer} /> : ""}
                    </li>
                  )
                )}
              </ol>
              <div className={style.title}>Đáp án:</div>
              {formik.values?.correct_answers
                .map((answer: number) => answers[answer])
                .join(",")}{" "}
            </>
          )}
          <div className={style.title}>Lời giải:</div>
          {formik.values.note}
        </div>
      </DialogContent>
      <DialogActions className={style.form_action}>
        <Button onClick={handleClose} variant="outlined">
          Thoát
        </Button>
        <Button onClick={() => {}} variant="contained">
          {isEdit ? "Chỉnh sửa" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(QuestionForm, (pre, next) => {
  return pre.open === next.open;
});
