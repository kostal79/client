import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "./slices/countSlice";
import userReducer from "./slices/userSlice";
import fileReducer from "./slices/fileSlice";
import uploadReducer from './slices/uploadSlice';
import appReducer from "./slices/appSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    file: fileReducer,
    upload: uploadReducer,
    app: appReducer,
  },
})