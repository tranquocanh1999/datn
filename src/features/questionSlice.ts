import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { questionForm } from "../services/questionService";
import {
  addQuestion,
  getListQuestion,
  getQuestionByID,
  removeQuestion,
  updateQuestion,
} from "../services/questionService";
import { levels } from "../shared/contants/question";
import { typeToast } from "../shared/contants/toast";
import { filter } from "../shared/utils/inteface";
import { setToast } from "./userSlice";

interface QuestionState {
  data: any[];
  error: any;
  question: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
}

const initialState = {
  data: [],
  error: { username: "" },
  question: {},
  isSuccess: false,
  isLoading: false,
  total: 0,
} as QuestionState;

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload.data;
      state.total = action.payload.totalElement;
      state.isLoading = false;
    },
    setQuestionLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setQuestionSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setQuestion(state, action: any) {
      state.question = action.payload;
      state.error = {};
    },
    setError(state, action: PayloadAction<any>) {
      state.error[action.payload.field] = action.payload.value;
    },
  },
});

export const getQuestions =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setQuestionSuccess(false));
      let response = await getListQuestion(param);
      dispatch(setData(response.data));
    } catch (error: any) {}
  };

export const getQuestion =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getQuestionByID(id);
      dispatch(
        setQuestion({
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
      dispatch(setQuestionLoading(true));
    }
  };

export const createQuestion =
  (data: questionForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setError({ field: "username", value: "" }));
      dispatch(setQuestionSuccess(false));

      await addQuestion(data);
      dispatch(setQuestionLoading(true));
      dispatch(setQuestionSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const editQuestion =
  (data: questionForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setQuestionSuccess(false));
      await updateQuestion(data);
      dispatch(setQuestionLoading(true));
      dispatch(setQuestionSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const deleteQuestion =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await removeQuestion(id);
      dispatch(setQuestionLoading(true));
      dispatch(
        setToast({
          message: "Xóa câu hỏi thành công.",
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
      dispatch(setQuestionLoading(true));
    }
  };

export const {
  setData,
  setQuestionLoading,
  setQuestionSuccess,
  setQuestion,
  setError,
} = questionSlice.actions;
export default questionSlice.reducer;
