import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../app/store";
import { getListSubject } from "../services/subjectService";

interface SubjectState {
  data: any[];
  error: any;
  isSuccess: boolean;
  isLoading: boolean;
  total: number;
}

const initialState = {
  data: [],
  error: { username: "" },
  isSuccess: false,
  isLoading: false,
  total: 0,
} as SubjectState;

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    setData(state, action: any) {
      state.data = action.payload;
    },
  },
});

export const getSubjectList = (): AppThunk => async (dispatch) => {
  try {
    let response = await getListSubject();
    dispatch(setData(response.data));
  } catch (error: any) {}
};

export const { setData } = subjectSlice.actions;
export default subjectSlice.reducer;
