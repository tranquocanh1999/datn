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
import SelectInput from "../../../../components/select";
import DateInput from "../../../../components/date-picker";
import { genders } from "../../../../shared/contants/user";
import { roles } from "../../../../shared/contants/role";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/rootReducer";
import { setToast } from "../../../../features/userSlice";
import { getAllClass } from "../../../../features/classSlice";
import {
  createTeacher,
  editTeacher,
  getTeacher,
} from "../../../../features/teacherSlice";
import { typeToast } from "../../../../shared/contants/toast";
import { getSubjectList } from "../../../../features/subjectSlice";
import { teacherFormSchema } from "../../../../shared/schema/teacher-schema";
import moment from "moment";
const UserForm: React.FC<FormProps> = (props): JSX.Element => {
  const { open, data, handleClose, isEdit } = props;
  const classes =
    useSelector((state: RootState) => state?.class?.allData) || [];
  const success = useSelector((state: RootState) => state?.teacher?.isSuccess);
  const error = useSelector((state: RootState) => state?.teacher?.error);
  const toast = useSelector((state: RootState) => state?.user?.toast);
  const teacher = useSelector((state: RootState) => state?.teacher?.teacher);
  const subjects =
    useSelector((state: RootState) => state?.subject?.data) || [];
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
    role: 0,
    subjects: [],
  };

  const formik = useFormik({
    initialValues: init,
    validationSchema: teacherFormSchema,
    onSubmit: (values) => {
      const value = {
        ...values,
        classes: values.classes.map((item) => {
          return { id: item };
        }),
      };
      isEdit
        ? dispatch<any>(
            editTeacher({
              ...value,
              role: { id: value.role },
              id: data?.id,
            })
          )
        : dispatch<any>(
            createTeacher({
              ...value,
              role: { id: value.role },
            })
          );
    },
  });

  useEffect(() => {
    if (success) {
      dispatch(
        setToast({
          message: isEdit
            ? "Chỉnh sửa giáo viên thành công."
            : "Thêm giáo viên thành công.",
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
      dispatch<any>(getSubjectList());
      formik.setValues(init);
      if (isEdit) {
        dispatch<any>(getTeacher(data?.id));
      }
    } else {
      formik.setValues(init);
    }
  }, [open]);

  useEffect(() => {
    if (teacher) {
      const teacherData = {
        ...teacher,
        classes:
          teacher.classes && teacher.classes.map((item: any) => item?.id),
        subjects:
          teacher.subjects && teacher.subjects.map((item: any) => item?.id),
        role: teacher.role?.id,
        isEdit: true,
      };
      formik.setValues(teacherData);
    }
  }, [teacher]);

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
        <div>{isEdit ? "Chỉnh sửa nhân viên" : "Thêm mới nhân viên"}</div>
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
          value={formik.values.classes || []}
          multiple
          onChange={(e: any) => {
            formik.setFieldValue("classes", e.target.value);
          }}
          errorText={(formik.touched.class && formik.errors.class) || ""}
        >
          {classes.map((item, index) => (
            <MenuItem key={index} value={item?.id}>
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
            className="phone ml-auto w-240"
            required
          />
        </div>
        <br />
        <div className="d-flex">
          <SelectInput
            name="subjects"
            label="Môn học"
            value={formik.values.subjects || []}
            multiple
            onChange={(e: any) => {
              formik.setFieldValue("subjects", e.target.value);
            }}
            errorText={(formik.touched.class && formik.errors.class) || ""}
            className=" w-240"
          >
            {subjects.map((item, index) => (
              <MenuItem key={index} value={item?.id}>
                {item.name}
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
            placeholder="Mật khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
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
            type="password"
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
export default React.memo(UserForm, (pre, next) => {
  return pre.open === next.open;
});
