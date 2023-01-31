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
import { useDispatch, useSelector } from "react-redux";
import {
  createClass,
  editClass,
  getClass,
} from "../../../../features/classSlice";
import { RootState } from "../../../../app/rootReducer";
import { setToast } from "../../../../features/userSlice";
import { typeToast } from "../../../../shared/contants/toast";
const ClassForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open = false, isEdit, data, handleClose } = props;
  const success = useSelector((state: RootState) => state?.class?.isSuccess);
  const dataClass = useSelector((state: RootState) => state?.class?.class);

  const dispatch = useDispatch();
  const init = {
    className: "",
    description: "",
  };
  const toast = useSelector((state: RootState) => state?.user?.toast);

  const formik = useFormik({
    initialValues: init,
    validationSchema: classFormSchema,
    onSubmit: (values) => {
      isEdit
        ? dispatch<any>(
            editClass({
              ...values,
              id: data.id,
            })
          )
        : dispatch<any>(
            createClass({
              ...values,
            })
          );
    },
  });

  useEffect(() => {
    if (success) {
      dispatch(
        setToast({
          message: isEdit
            ? "Chỉnh sửa lớp học thành công."
            : "Thêm mới lớp học thành công.",
          type: typeToast.SUCCESS,
        })
      );
    }
  }, [success]);

  useEffect(() => {
    if (toast.message) {
      handleClose();
    }
  }, [toast]);

  useEffect(() => {
    formik.resetForm();
    if (open) {
      if (isEdit) {
        dispatch<any>(getClass(data.id));
      } else {
        formik.setValues(init);
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

  useEffect(() => {
    if (dataClass) {
      formik.setValues(dataClass);
    }
  }, [dataClass]);

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
          name="className"
          label="Tên lớp học"
          placeholder="Tên lớp học"
          value={formik.values.className}
          onChange={formik.handleChange}
          errorText={
            (formik.touched.className && formik.errors.className) || ""
          }
          className="className"
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
