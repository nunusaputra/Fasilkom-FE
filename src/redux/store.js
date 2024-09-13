import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import InformationSlice from "./Slice/InformationSlice";
import createAccountSlice from "./Slice/createAccountSlice";
import createJobSlice from "./Slice/createJobSlice";
import jobMhsSlice from "./Slice/jobMhsSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "./Slice/applicantSlice";
import logbookSlice from "./Slice/logbookSlice";
import loginMhsSlice from "./Slice/loginMhsSlice";
import filter from "redux-persist-transform-filter";
import infoMhsSlice from "./Slice/infoMhsSlice";
import logbookMhsSlice from "./Slice/logbookMhsSlice";

// const loginMhs = [filter("loginMhs", [], ["user"])];
// const auth = [filter("auth", [], ["user"])];

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["jobMhs"],
//   loginMhs,
//   auth,
// };

// const reducer = combineReducers({
//   auth: authSlice,
//   loginMhs: loginMhsSlice,
//   info: InformationSlice,
//   account: createAccountSlice,
//   job: createJobSlice,
//   jobMhs: jobMhsSlice,
//   app: applicantSlice,
//   logbook: logbookSlice,
//   infoMhs: infoMhsSlice,
//   logbookMhs: logbookMhsSlice,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: {
    auth: authSlice,
    loginMhs: loginMhsSlice,
    info: InformationSlice,
    account: createAccountSlice,
    job: createJobSlice,
    jobMhs: jobMhsSlice,
    app: applicantSlice,
    logbook: logbookSlice,
    infoMhs: infoMhsSlice,
    logbookMhs: logbookMhsSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["persist/PERSIST"],
  //       ignoredPath: ["register", "rehydrate"],
  //     },
  //   }),
  // devTools: false,
});

export default store;
