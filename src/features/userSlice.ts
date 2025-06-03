import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { role } from "../shared/contants/role";
import { AppThunk } from "../app/store";
import { getUser, signIn, signOut } from "../services/authService";
import { typeToast } from "../shared/contants/toast";

interface UserState {
  role?: number | null;
  loading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  toast?: any;
  user?: any;
  error?: any;
}

const initialState = {
  role: null,
  loading: false,
  accessToken: "",
  refreshToken: "",
  idToken: "",
  toast: {
    message: "",
    type: "",
  },
  user: {},
  error: {},
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
      state.role = action.payload.user.role.id;
    },
    setToken(state, action: any) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.idToken = action.payload.id;
    },
    clearUser(state) {
      state.user = {};
      state.role = null;
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
      let user = await getUser();
      dispatch(setUser({ user: user.data }));
    } catch (error: any) {
      dispatch(setToast({ message: error.message, type: typeToast.ERROR }));
    }
  };

export const logout =
  (idToken: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setToken(await signOut(idToken)));
      dispatch(clearUser());
    } catch (error: any) {}
  };

export const {
  setUser,
  setToken,
  setLoading,
  setToast,
  setAccessToken,
  clearUser,
} = userSlice.actions;
export default userSlice.reducer;
