/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import { classFormSchema } from "../../../../shared/schema/class-schema";
import style from "./class-form.module.scss";
import { Close } from "@mui/icons-material";
const ClassForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, isEdit, data, handleClose } = props;
  const init = {
    name: "",
    description: "",
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
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={style.form_title}>
        <div>{isEdit ? "Chỉnh sửa lớp học" : "Thêm mới lớp học"}</div>
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
          name="name"
          label="Tên lớp học"
          placeholder="Tên lớp học"
          value={formik.values.name}
          onChange={formik.handleChange}
          errorText={(formik.touched.name && formik.errors.name) || ""}
          className="name"
          required
        />
        <br />
        <FieldInput
          name="description"
          label="Mô tả"
          placeholder="Mô tả"
          value={formik.values.description}
          onChange={formik.handleChange}
          errorText={
            (formik.touched.description && formik.errors.description) || ""
          }
          row={4}
          type="password"
        />
      </DialogContent>
      <DialogActions className={style.form_action}>
        <Button onClick={handleClose} variant="outlined">
          Hủy bỏ
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

export default React.memo(ClassForm, (pre, next) => {
  return pre.open === next.open;
});
