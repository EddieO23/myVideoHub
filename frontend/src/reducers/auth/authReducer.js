import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner";


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
      toast.success(data.message);
    } else {
      toast.warning(data.message);
    }
  } catch (error) {
    toast.error(error);
  }
});


// Sign In Request to the backend
export const signInUser = createAsyncThunk("auth/sign-in-user", async (payload) => { 
  try {
    const data = await backendApi.post("/api/v1/auth/sign-in", payload);
    if (data.success) {
      if (data.user) {
        toast.success(data.message);
        localStorage.setItem("token", data.user.token); // Assuming the token is in data.token
      }
      return data.user; // Return the user data to be used in the reducer
    } else {
      toast.warning(data.message);
    }
  } catch (error) {
    console.error("Sign-in error:", error); // Log the error
    toast.error("An error occurred during sign-in."); // Notify the user
  }
});


export const authReducer = authSlice.reducer
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectLoading = (state) => state.auth.loading