import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import {
  addClass,
  classForm,
  getAll,
  getClassByID,
  getClassesByStudent,
  getListClass,
  removeClass,
  updateClass,
} from "../services/classService";
import { typeToast } from "../shared/contants/toast";
import { filter } from "../shared/utils/inteface";
import { setToast } from "./userSlice";

interface ClassState {
  data: any[];
  allData: any[];
  error: any[];
  class: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
}

const initialState = {
  data: [],
  error: [],
  allData: [],
  class: {},
  isSuccess: false,
  isLoading: false,
  total: 0,
} as ClassState;

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload.data;
      state.total = action.payload.totalElement;
      state.isLoading = false;
    },
    setClassLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setClassSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setClass(state, action: any) {
      state.class = action.payload;
    },
    setAllData(state, action: any) {
      state.allData = action.payload;
    },
  },
});

export const getClasses =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getListClass(param);
      dispatch(setData(response.data));
    } catch (error: any) {}
  };

export const getClass =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getClassByID(id);
      dispatch(setClass(response.data));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setClassLoading(true));
    }
  };

export const getAllClass = (): AppThunk => async (dispatch) => {
  try {
    let response = await getAll();
    dispatch(setAllData(response.data));
  } catch (error: any) {
    dispatch(
      setToast({
        message: error.message,
        type: typeToast.ERROR,
      })
    );
    dispatch(setClassLoading(true));
  }
};

export const getAllClassByStudent = (): AppThunk => async (dispatch) => {
  try {
    let response = await getClassesByStudent();
    dispatch(setAllData(response.data));
  } catch (error: any) {
    dispatch(
      setToast({
        message: error.message,
        type: typeToast.ERROR,
      })
    );
    dispatch(setClassLoading(true));
  }
};

export const createClass =
  (data: classForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setClassSuccess(false));
      await addClass(data);
      dispatch(setClassLoading(true));
      dispatch(setClassSuccess(true));
    } catch (error: any) {}
  };

export const editClass =
  (data: classForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setClassSuccess(false));
      await updateClass(data);
      dispatch(setClassLoading(true));
      dispatch(setClassSuccess(true));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setClassLoading(true));
    }
  };

export const deleteClass =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await removeClass(id);
      dispatch(setClassLoading(true));
      dispatch(
        setToast({
          message: "Xóa lớp học thành công.",
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
      dispatch(setClassLoading(true));
    }
  };

export const {
  setData,
  setClassLoading,
  setClassSuccess,
  setClass,
  setAllData,
} = classSlice.actions;
export default classSlice.reducer;
