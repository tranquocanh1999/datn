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
import style from "./user-form.module.scss";
import { Close } from "@mui/icons-material";
import { useFormik } from "formik";
import FieldInput from "../../../../components/input";
import { classFormSchema } from "../../../../shared/schema/class-schema";
import SelectInput from "../../../../components/select";
import DateInput from "../../../../components/date-picker";
import { genders } from "../../../../shared/contants/user";
import { roles } from "../../../../shared/contants/role";
import { subjects } from "../../../../shared/contants/question";
const UserForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const init = {
    code: "",
    fullName: "",
    birthday: "",
    email: "",
    phone: "",
    classes: [1],
    gender: 0,
    username: "",
    password: "",
    class: "",
    confirmPassword: "",
    role: 0,
    subjects: [0],
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
        <div className="d-flex">
          <FieldInput
            name="code"
            label="Mã nhân viên"
            placeholder="Mã nhân viên"
            value={formik.values.code}
            onChange={formik.handleChange}
            errorText={(formik.touched.code && formik.errors.code) || ""}
            className="code w-240"
            required
          />
          <FieldInput
            name="username"
            label="Tên đăng nhập"
            placeholder="Tên đăng nhập"
            value={formik.values.username}
            onChange={formik.handleChange}
            errorText={
              (formik.touched.username && formik.errors.username) || ""
            }
            className="username ml-auto w-240"
            required
          />
        </div>
        <br />
        <FieldInput
          name="fullName"
          label="Tên nhân viên"
          placeholder="Tên nhân viên"
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
          value={formik.values.classes}
          multiple
          onChange={(e: any) => {
            formik.setFieldValue("classes", e.target.value);
          }}
          errorText={(formik.touched.class && formik.errors.class) || ""}
        >
          {classes.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
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
            name="phone"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={formik.values.phone}
            onChange={formik.handleChange}
            errorText={(formik.touched.phone && formik.errors.phone) || ""}
            className="phone ml-auto w-240"
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <SelectInput
            name="subjects"
            label="Lớp học"
            value={formik.values.subjects}
            multiple
            onChange={(e: any) => {
              formik.setFieldValue("subjects", e.target.value);
            }}
            errorText={(formik.touched.class && formik.errors.class) || ""}
            className=" w-240"
          >
            {subjects.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </SelectInput>
          <SelectInput
            className="ml-auto  w-240"
            name="role"
            label="Chức vụ"
            value={formik.values.role}
            onChange={formik.handleChange}
            errorText={(formik.touched.role && formik.errors.role) || ""}
          >
            {roles.map((item, index) => (
              <MenuItem key={index} value={index}>
                {item}
              </MenuItem>
            ))}
          </SelectInput>
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
        <Button onClick={() => {}} variant="contained">
          {isEdit ? "Chỉnh sửa" : "Thêm mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default React.memo(UserForm, (pre, next) => {
  return pre.open === next.open;
});
