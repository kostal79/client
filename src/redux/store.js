import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./slices/countSlice";
import userReducer from "./slices/userSlice";
import fileReducer from "./slices/fileSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    file: fileReducer,
  },
})