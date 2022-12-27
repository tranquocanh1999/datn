import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { role } from "../contants/role";
import { AppThunk } from "../app/store";

interface UserState {
  role: number;
  loading?: boolean;
}

const initialState = { role: 0, loading: false } as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.role = action.payload.role;
    },
  },
});

export const login =
  (form: { username: string; password: string }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setUser({ role: role.TEACHER }));
    } catch (error: any) {}
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setUser({ role: 0 }));
  } catch (error: any) {}
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
