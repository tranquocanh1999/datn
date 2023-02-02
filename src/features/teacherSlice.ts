import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { teacherForm } from "../services/teacherService";
import {
  addTeacher,
  getListTeacher,
  getTeacherByID,
  removeTeacher,
  updateTeacher,
} from "../services/teacherService";
import { typeToast } from "../shared/contants/toast";
import { filter } from "../shared/utils/inteface";
import { setToast } from "./userSlice";

interface TeacherState {
  data: any[];
  error: any;
  teacher: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
}

const initialState = {
  data: [],
  error: { username: "" },
  teacher: {},
  isSuccess: false,
  isLoading: false,
  total: 0,
} as TeacherState;

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload.data;
      state.total = action.payload.totalElement;
      state.isLoading = false;
    },
    setTeacherLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setTeacherSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setTeacher(state, action: any) {
      state.teacher = action.payload;
      state.error = {};
    },
    setError(state, action: PayloadAction<any>) {
      state.error[action.payload.field] = action.payload.value;
    },
  },
});

export const getTeachers =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setTeacherSuccess(false));
      let response = await getListTeacher(param);
      dispatch(setData(response.data));
    } catch (error: any) {}
  };

export const getTeacher =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getTeacherByID(id);
      dispatch(
        setTeacher({
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
      dispatch(setTeacherLoading(true));
    }
  };

export const createTeacher =
  (data: teacherForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setError({ field: "username", value: "" }));
      dispatch(setTeacherSuccess(false));
      await addTeacher(data);
      dispatch(setTeacherLoading(true));
      dispatch(setTeacherSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const editTeacher =
  (data: teacherForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setTeacherSuccess(false));
      await updateTeacher(data);
      dispatch(setTeacherLoading(true));
      dispatch(setTeacherSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const deleteTeacher =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await removeTeacher(id);
      dispatch(setTeacherLoading(true));
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
      dispatch(setTeacherLoading(true));
    }
  };

export const {
  setData,
  setTeacherLoading,
  setTeacherSuccess,
  setTeacher,
  setError,
} = teacherSlice.actions;
export default teacherSlice.reducer;
