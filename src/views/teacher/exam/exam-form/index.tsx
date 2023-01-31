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
import { classFormSchema } from "../../../../shared/schema/class-schema";
import SelectInput from "../../../../components/select";
import DateTimeInput from "../../../../components/date-picker/date-time";
import TimeInput from "../../../../components/date-picker/time";
import { levels } from "../../../../shared/contants/question";

const ExamForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const init = {
    code: "",
    title: "",
    startTime: "",
    period: "",
    endTime: "",
    class: { id: 1, code: "ABC", name: "Lớp thầy Huấn 4" },
  };

  const classes = [
    {
      id: 1,
      code: "CL001",
      name: "Lớp thầy tuấn 4",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 2,
      code: "CL001",
      name: "Lớp thầy tuấn 3",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 3,
      code: "CL001",
      name: "Lớp thầy tuấn 2",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
    {
      id: 4,
      code: "CL001",
      name: "Lớp thầy tuấn 1 ",
      teacher_name: "Huấn hoa hồng",
      numberOfStudent: 35,
      description: "đây là mô tả",
    },
  ];

  const formik = useFormik({
    initialValues: init,
    validationSchema: classFormSchema,
    onSubmit: (values) => {},
  });

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
        <div>{isEdit ? "Chỉnh sửa học sinh" : "Thêm mới học sinh"}</div>
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
          placeholder="Mã nhân viên"
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
        <br />
        <SelectInput
          name="class"
          label="Lớp học"
          value={formik.values.class.id}
          onChange={(e: any) => {
            formik.setFieldValue("class", { id: e.target.value });
          }}
          errorText={""}
        >
          {classes.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </SelectInput>
        <br />{" "}
        <div className="d-flex">
          <SelectInput
            name="period"
            label="Thời gian làm bài"
            value={formik.values.period}
            onChange={(e: any) => {
              formik.setFieldValue("period", e.target.value);
            }}
            className="startTime  w-240"
            errorText={""}
          >
            {[15, 45, 60, 120].map((item, index) => (
              <MenuItem key={index} value={index}>
                {item} phút
              </MenuItem>
            ))}
          </SelectInput>
          <FieldInput
            name="title"
            label="Tổng số đề thi"
            placeholder="Tổng số đề thi"
            value={formik.values.title}
            onChange={formik.handleChange}
            errorText={(formik.touched.title && formik.errors.title) || ""}
            className="username ml-auto w-240"
            type="number"
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <DateTimeInput
            name="startTime"
            label="Thời gian bắt đầu"
            placeholder="Thời gian bắt đầu"
            value={formik.values.startTime || ""}
            onChange={(e: string) => {
              formik.setFieldValue("startTime", e);
            }}
            errorText={
              (formik.touched.startTime && formik.errors.startTime) || ""
            }
            className="startTime  w-240"
            required
          />
          <DateTimeInput
            name="endTime"
            label="Thời gian kết thúc"
            placeholder="Thời gian kết thúc"
            value={formik.values.endTime || ""}
            onChange={(e: string) => {
              formik.setFieldValue("endTime", e);
            }}
            errorText={(formik.touched.endTime && formik.errors.endTime) || ""}
            className="endTime ml-auto  w-240"
            required
          />
        </div>
        <br />
        {levels.map((item) => (
          <>
            <div className="d-flex">
              <Checkbox checked className={style.checkbox} onClick={() => {}} />
              {item}
              <FieldInput
                name="title"
                label=""
                placeholder="Tổng số câu hỏi"
                value={formik.values.title}
                onChange={formik.handleChange}
                errorText={(formik.touched.title && formik.errors.title) || ""}
                className="username ml-auto w-240"
                type="number"
              />
            </div>
            <br />
          </>
        ))}
        <br />
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
export default React.memo(ExamForm, (pre, next) => {
  return pre.open === next.open;
});
