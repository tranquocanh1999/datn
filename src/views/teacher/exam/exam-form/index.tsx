/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  ToggleButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import style from "./exam-form.module.scss";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import SelectInput from "../../../../components/select";
import { levels } from "../../../../shared/contants/question";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import { typeToast } from "../../../../shared/contants/toast";
import { setToast } from "../../../../features/userSlice";
import { getSubjectList } from "../../../../features/subjectSlice";
import { getAllClass, getClasses } from "../../../../features/classSlice";
import { competitionFormSchema } from "../../../../shared/schema/competition-schema";
import { createCompetition } from "../../../../features/competitionSlice";

const ExamForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const init = {
    code: "",
    title: "",
    time: 15,
    subject: "",
    numberOfExam: 1,
    classroom: "",
    hasQuestionLv1: false,
    numberOfQuestionLv1: 0,
    hasQuestionLv2: false,
    numberOfQuestionLv2: 0,
    hasQuestionLv3: false,
    numberOfQuestionLv3: 0,
    hasQuestionLv4: false,
    numberOfQuestionLv4: 0,
  };
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];

  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const toast = useSelector((state: RootState) => state?.user?.toast);
  const success = useSelector(
    (state: RootState) => state?.competition?.isSuccess
  );

  const formik = useFormik({
    initialValues: init,
    validationSchema: competitionFormSchema,
    onSubmit: (values) => {
      let data = {
        ...values,
        classroom: { id: values.classroom },
        subject: { id: values.subject },
      };
      dispatch<any>(createCompetition(data));
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (toast.message) {
      handleClose();
    }
  }, [toast]);

  useEffect(() => {
    if (success) {
      dispatch(
        setToast({
          message: "Thêm mới bài thi thành công.",
          type: typeToast.SUCCESS,
        })
      );
    }
  }, [success]);

  useEffect(() => {
    formik.resetForm();
    if (open) {
      dispatch<any>(getSubjectList());
      dispatch<any>(getAllClass());
      formik.setValues(init);
    } else {
      formik.setValues(init);
    }
  }, [open]);

  useEffect(() => {
    if (subjects?.length) {
      formik.setFieldValue("subject", subjects[0].id);
    }
  }, [subjects]);

  useEffect(() => {
    if (classes?.length) {
      formik.setFieldValue("classroom", classes[0].id);
    }
  }, [classes]);

  useEffect(() => {
    formik.resetForm();
    if (open) {
      if (isEdit) {
        data.classes = data.classes.map((item: any) => item.id);
        data.subjects = data.subjects.map((item: any) => item.id);
        formik.setValues({ ...data, password: "", confirmPassword: "" });
      } else {
        formik.setValues(init);
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

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
        <div> Thêm mới bài thi</div>
        <ToggleButton
          value="left"
          aria-label="left aligned"
          sx={{ border: "none", padding: 0 }}
        >
          <Close onClick={handleClose} />
        </ToggleButton>
      </DialogTitle>
      <DialogContent className={style.form_content}>
        <FieldInput
          name="code"
          label="Mã bài thi"
          placeholder="Mã bài thi"
          value={formik.values.code}
          onChange={formik.handleChange}
          errorText={(formik.touched.code && formik.errors.code) || ""}
          className="code "
          required
        />
        <br />
        <FieldInput
          name="title"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          value={formik.values.title}
          onChange={formik.handleChange}
          errorText={(formik.touched.title && formik.errors.title) || ""}
          className="username"
          required
        />
        <br />{" "}
        <div className="d-flex">
          <SelectInput
            name="class"
            label="Lớp học"
            value={formik.values.classroom}
            onChange={formik.handleChange}
            errorText={""}
            className="w-240"
          >
            {classes.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.className}
              </MenuItem>
            ))}
          </SelectInput>
          <SelectInput
            name="subject"
            label="Lớp học"
            value={formik.values.subject}
            onChange={formik.handleChange}
            errorText={""}
            className="ml-auto w-240"
          >
            {subjects.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </SelectInput>
        </div>
        <br />
        <div className="d-flex">
          <SelectInput
            name="time"
            label="Thời gian làm bài"
            value={formik.values.time}
            onChange={formik.handleChange}
            className="startTime  w-240"
            errorText={""}
          >
            {[15, 45, 60, 120].map((item, index) => (
              <MenuItem key={index} value={item}>
                {item} phút
              </MenuItem>
            ))}
          </SelectInput>
          <FieldInput
            name="numberOfExam"
            label="Tổng số đề thi"
            placeholder="Tổng số đề thi"
            value={formik.values.numberOfExam}
            onChange={formik.handleChange}
            errorText={
              (formik.touched.numberOfExam && formik.errors.numberOfExam) || ""
            }
            className="username ml-auto w-240"
            type="number"
            required
          />
        </div>
        <br />
        {levels.map((item, index) => (
          <div key={index}>
            <div className={style.question}>
              <Checkbox
                checked={(formik.values as any)[`hasQuestionLv${index + 1}`]}
                className={style.checkbox}
                onClick={() => {
                  formik.setFieldValue(
                    `hasQuestionLv${index + 1}`,
                    !(formik.values as any)[`hasQuestionLv${index + 1}`]
                  );
                }}
              />
              {item}
              <FieldInput
                name={`numberOfQuestionLv${index + 1}`}
                label=""
                disabled={!(formik.values as any)[`hasQuestionLv${index + 1}`]}
                placeholder="Tổng số câu hỏi"
                value={(formik.values as any)[`numberOfQuestionLv${index + 1}`]}
                onChange={formik.handleChange}
                errorText={
                  ((formik.touched as any)[`numberOfQuestionLv${index + 1}`] &&
                    (formik.errors as any)[`numberOfQuestionLv${index + 1}`]) ||
                  ""
                }
                className="username ml-auto w-240"
                type="number"
              />
            </div>
            <br />
          </div>
        ))}
        <br />
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
          Thêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default React.memo(ExamForm, (pre, next) => {
  return pre.open === next.open;
});
