import {configureStore} from "@reduxjs/toolkit";


import { authReducer } from "./auth/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
