import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const userConfig = {
  key: "user",
  storage,
  blacklist: ["loading"],
};

const combinedReducer = combineReducers({
  user: persistReducer(userConfig, userReducer),
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "logOut") {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
