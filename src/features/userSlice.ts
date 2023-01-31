import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { role } from "../shared/contants/role";
import { AppThunk } from "../app/store";
import { signIn, signOut } from "../services/authService";

interface UserState {
  role: number;
  loading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  toast?: any;
}

const initialState = {
  role: 0,
  loading: false,
  accessToken: "",
  refreshToken: "",
  idToken: "",
  toast: {
    message: "",
    type: "",
  },
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.role = action.payload.role;
    },
    setToken(state, action: any) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.idToken = action.payload.id;
    },
    setAccessToken(state, action: any) {
      state.accessToken = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToast(state, action: PayloadAction<{ message: string; type: string }>) {
      state.toast = action.payload;
    },
  },
});

export const login =
  (form: { username: string; password: string }): AppThunk =>
  async (dispatch) => {
    try {
      let response = await signIn(form.username, form.password);
      dispatch(setToken(response.data));
      dispatch(setUser({ role: role.TEACHER }));
    } catch (error: any) {}
  };

export const logout =
  (idToken: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setToken(await signOut(idToken)));
      dispatch(setUser({ role: 0 }));
    } catch (error: any) {}
  };

export const { setUser, setToken, setLoading, setToast, setAccessToken } =
  userSlice.actions;
export default userSlice.reducer;
