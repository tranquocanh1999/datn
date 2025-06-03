import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import {
  changeStatus,
  competitionForm,
  getCompetitionExamByStudent,
  getCompetitionExams,
  getDegreeData,
  getExamStudents,
  getListCompetitionByStudent,
  startExam,
  submitExam,
} from "../services/competitionService";
import {
  addCompetition,
  getListCompetition,
  getCompetitionByID,
  removeCompetition,
} from "../services/competitionService";
import { typeToast } from "../shared/contants/toast";
import { filter } from "../shared/utils/inteface";
import { setToast } from "./userSlice";

interface CompetitionState {
  data: any[];
  error: any;
  competition: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
  exams: any;
  exam: any;
  students: any;
  degreeData: any;
}

const initialState = {
  data: [],
  error: { username: "" },
  competition: {},
  isSuccess: false,
  isLoading: false,
  total: 0,
  exams: [],
  exam: {},
  students: [],
  degreeData: [],
} as CompetitionState;

const competitionSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload.data;
      state.total = action.payload.totalElement;
      state.isLoading = false;
    },
    setStudents(state, action: any) {
      state.students = action.payload;
    },
    setDegreeData(state, action: any) {
      state.degreeData = action.payload;
    },
    setExams(state, action: any) {
      state.exams = action.payload.data;
    },
    setExam(state, action: PayloadAction<any>) {
      state.exam = action.payload;
    },
    setCompetitionLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCompetitionSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    setCompetition(state, action: any) {
      state.competition = action.payload;
      state.error = {};
    },
    setStatus(state, action: PayloadAction<number>) {
      state.competition.status = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error[action.payload.field] = action.payload.value;
    },
  },
});

export const getCompetitions =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setCompetitionSuccess(false));
      let response = await getListCompetition(param);
      if (response?.data) dispatch(setData(response?.data));
    } catch (error: any) {}
  };

export const getCompetitionsByStudent =
  (param: filter): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setCompetitionSuccess(false));
      let response = await getListCompetitionByStudent(param);
      if (response?.data) dispatch(setData(response?.data));
    } catch (error: any) {}
  };

export const getCompetition =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getCompetitionByID(id);
      dispatch(
        setCompetition({
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
      dispatch(setCompetitionLoading(true));
    }
  };

export const getCompetitionExamList =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getCompetitionExams(id);
      dispatch(setExams(response));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const getCompetitionExamById =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getCompetitionExamByStudent(id);
      dispatch(setExam(response.data));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const getStudentList =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getExamStudents(id);
      dispatch(setStudents(response.data));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const getDataDegree =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      let response = await getDegreeData(id);
      dispatch(setDegreeData(response.data));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const examStart =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await startExam(id);
      dispatch(getCompetitionExamById(id));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const examSubmit =
  (idExam: string, idCompetition: string, data: any): AppThunk =>
  async (dispatch) => {
    try {
      await submitExam(idExam, data);
      dispatch(getCompetitionExamById(idCompetition));
    } catch (error: any) {
      dispatch(
        setToast({
          message: error.message,
          type: typeToast.ERROR,
        })
      );
      dispatch(setCompetitionLoading(true));
    }
  };

export const createCompetition =
  (data: competitionForm): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setError({ field: "username", value: "" }));
      dispatch(setCompetitionSuccess(false));

      await addCompetition(data);
      dispatch(setCompetitionLoading(true));
      dispatch(setCompetitionSuccess(true));
    } catch (error: any) {
      if (error.mgsCode === "USERNAME_IS_USED") {
        dispatch(setError({ field: "username", value: error.message }));
      }
    }
  };

export const statusChange =
  (id: string, status: number): AppThunk =>
  async (dispatch) => {
    try {
      await changeStatus(id, status);
      dispatch(setStatus(status));
    } catch (error: any) {}
  };

export const deleteCompetition =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await removeCompetition(id);
      dispatch(setCompetitionLoading(true));
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
      dispatch(setCompetitionLoading(true));
    }
  };

export const {
  setData,
  setCompetitionLoading,
  setCompetitionSuccess,
  setCompetition,
  setError,
  setExams,
  setStatus,
  setStudents,
  setDegreeData,
  setExam,
} = competitionSlice.actions;
export default competitionSlice.reducer;
