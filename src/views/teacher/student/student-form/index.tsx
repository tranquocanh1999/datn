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
import React, { useEffect } from "react";
import { FormProps } from "../../../../shared/utils/inteface";
import { Transition } from "../../../../shared/utils/transition";
import style from "./student-form.module.scss";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import SelectInput from "../../../../components/select";
import DateInput from "../../../../components/date-picker";
import { genders } from "../../../../shared/contants/user";
import { RootState } from "../../../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { studentFormSchema } from "../../../../shared/schema/student-schema";
import {
  createStudent,
  editStudent,
  getStudent,
} from "../../../../features/studentSlice";
import moment from "moment";
import { setToast } from "../../../../features/userSlice";
import { typeToast } from "../../../../shared/contants/toast";
import { getAllClass } from "../../../../features/classSlice";
const StudentForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const success = useSelector((state: RootState) => state?.student?.isSuccess);
  const error = useSelector((state: RootState) => state?.student?.error);
  const toast = useSelector((state: RootState) => state?.user?.toast);
  const student = useSelector((state: RootState) => state?.student?.student);
  const dispatch = useDispatch();
  const init = {
    fullName: "",
    birthday: moment().format("DD-MM-yyyy"),
    email: "",
    phoneNumber: "",
    classes: [],
    gender: 0,
    username: "",
    password: "",
    class: "",
    confirmPassword: "",
    isEdit: false,
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: studentFormSchema,
    onSubmit: (values) => {
      const value = {
        ...values,
        classes: values.classes.map((item) => {
          return { id: item };
        }),
      };
      isEdit
        ? dispatch<any>(
            editStudent({
              ...value,
              id: data.id,
            })
          )
        : dispatch<any>(
            createStudent({
              ...value,
            })
          );
    },
  });

  useEffect(() => {
    if (success) {
      dispatch(
        setToast({
          message: isEdit
            ? "Chỉnh sửa học sinh thành công."
            : "Thêm mới học sinh thành công.",
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
      dispatch<any>(getAllClass());
      formik.setValues(init);
      if (isEdit) {
        dispatch<any>(getStudent(data.id));
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

  useEffect(() => {
    if (student) {
      const studentData = {
        ...student,
        classes: student.classes && student.classes.map((item: any) => item.id),
        isEdit: true,
      };
      formik.setValues(studentData);
    }
  }, [student]);

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
          name="username"
          label="Tên đăng nhập"
          placeholder="Tên đăng nhập"
          value={formik.values.username}
          onChange={formik.handleChange}
          errorText={
            (formik.touched.username && formik.errors.username) ||
            error.username ||
            ""
          }
          className="username ml-auto "
          required
        />

        <br />
        <FieldInput
          name="fullName"
          label="Tên học sinh"
          placeholder="Tên học sinh"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          errorText={(formik.touched.fullName && formik.errors.fullName) || ""}
          className="fullName"
          required
        />
        <br />
        <SelectInput
          name="classes"
          label="Lớp học"
          value={formik.values.classes || []}
          multiple
          onChange={(e: any) => {
            formik.setFieldValue("classes", e.target.value);
          }}
          errorText={(formik.touched.class && formik.errors.class) || ""}
        >
          {classes.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.className}
            </MenuItem>
          ))}
        </SelectInput>
        <br />
        <div className="d-flex">
          <DateInput
            name="birthday"
            label="Ngày sinh"
            placeholder="Ngày sinh"
            value={formik.values.birthday || ""}
            onChange={(e: string) => {
              formik.setFieldValue("birthday", e);
            }}
            errorText={
              (formik.touched.birthday && formik.errors.birthday) || ""
            }
            className="birthday  w-240"
            required
          />
          <SelectInput
            className="ml-auto  w-240"
            name="gender"
            label="Giới tính"
            value={formik.values.gender}
            onChange={formik.handleChange}
            errorText={(formik.touched.gender && formik.errors.gender) || ""}
          >
            {genders.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </SelectInput>
        </div>
        <br />
        <div className="d-flex">
          <FieldInput
            name="email"
            label="Mail"
            placeholder="Mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorText={(formik.touched.email && formik.errors.email) || ""}
            className="email w-240"
            required
          />

          <FieldInput
            name="phoneNumber"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            errorText={
              (formik.touched.phoneNumber && formik.errors.phoneNumber) || ""
            }
            className="phoneNumber ml-auto w-240"
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <FieldInput
            name="password"
            label="Mật khẩu"
            placeholder="Số điện thoại"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorText={
              (formik.touched.password && formik.errors.password) || ""
            }
            className="w-240"
            required={!isEdit}
          />
          <FieldInput
            name="confirmPassword"
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            errorText={
              (formik.touched.confirmPassword &&
                formik.errors.confirmPassword) ||
              ""
            }
            className="confirmPassword w-240 ml-auto"
            required={!isEdit}
          />
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

export default React.memo(StudentForm, (pre, next) => {
  return pre.open === next.open;
});
