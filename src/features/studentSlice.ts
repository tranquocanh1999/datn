import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { studentForm } from "../services/studentService";
import {
  addStudent,
  getListStudent,
  getStudentByID,
  removeStudent,
  updateStudent,
} from "../services/studentService";
import { typeToast } from "../shared/contants/toast";
import { filter } from "../shared/utils/inteface";
import { setToast } from "./userSlice";

interface StudentState {
  data: any[];
  error: any;
  student: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
}

const initialState = {
  data: [],
  error: { username: "" },
  student: {},
  isSuccess: false,
  isLoading: false,
  total: 0,
} as StudentState;

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload.data;
      state.total = action.payload.totalElement;
      state.isLoading = false;
    },
    setStudentLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setStudentSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setStudent(state, action: any) {
      state.student = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error[action.payload.field] = action.payload.value;
    },
  },
});

export const getStudents =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getListStudent(param);
      dispatch(setData(response.data));
    } catch (error: any) {}
  };

export const getStudent =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getStudentByID(id);
      dispatch(
        setStudent({
          ...response.data,
          password: "",
          confirmPassword: "",
        })
      );
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setStudentLoading(true));
    }
  };

export const createStudent =
  (data: studentForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setError({ field: "username", value: "" }));
      dispatch(setStudentSuccess(false));
      await addStudent(data);
      dispatch(setStudentLoading(true));
      dispatch(setStudentSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const editStudent =
  (data: studentForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setStudentSuccess(false));
      await updateStudent(data);
      dispatch(setStudentLoading(true));
      dispatch(setStudentSuccess(true));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setStudentLoading(true));
    }
  };

export const deleteStudent =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await removeStudent(id);
      dispatch(setStudentLoading(true));
      dispatch(
        setToast({
          message: "Xóa học sinh thành công.",
          type: typeToast.SUCCESS,
        })
      );
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setStudentLoading(true));
    }
  };

export const {
  setData,
  setStudentLoading,
  setStudentSuccess,
  setStudent,
  setError,
} = studentSlice.actions;
export default studentSlice.reducer;
