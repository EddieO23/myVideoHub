import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import backendApi from "../../api/backendApi.js";


const initialState = {
  loggedInUser: null,
  loading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

// Sgn Up Request to the backend
export const signUpUser = createAsyncThunk("auth/sign-up-user", async (payload) => {
  try {
    const {data} = await backendApi.post("/api/v1/auth/sign-up", payload)

    if(data.success) {
      console.log(data.message);
    } else {
      console.log(data.message);
    }


  } catch (error) {
    console.error(error);
  }
});


export const authReducer = authSlice.reducer
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectLoading = (state) => state.auth.loading