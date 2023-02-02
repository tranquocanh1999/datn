import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import classReducer from "../features/classSlice";
import studentReducer from "../features/studentSlice";
import teacherReducer from "../features/teacherSlice";
import subjectReducer from "../features/subjectSlice";
import questionReducer from "../features/questionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const userConfig = {
  key: "user",
  storage,
  blacklist: ["loading", "toast"],
};

const combinedReducer = combineReducers({
  user: persistReducer(userConfig, userReducer),
  class: classReducer,
  student: studentReducer,
  teacher: teacherReducer,
  subject: subjectReducer,
  question: questionReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "logOut") {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};
export default rootReducer;
