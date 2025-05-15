import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import backendApi from '../../api/backendApi.js';

const initialState = {
  loggedInUser: null,
  loading: true,
};

// Sgn Up Request to the backend
export const signUpUser = createAsyncThunk(
  'auth/sign-up-user',
  async (payload) => {
    try {
      const { data } = await backendApi.post('/api/v1/auth/sign-up', payload);

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  }
);

// Sign In Request to the backend
export const signInUser = createAsyncThunk(
  'auth/sign-in-user',
  async (payload, thunkApi) => {
    try {
      const {email, password} = payload;
      const data = await backendApi.post('/api/v1/auth/sign-in', {email, password});
      if (data.success && data.user?.token) {
        if (data.user) {
          toast.success(data.message);
          localStorage.setItem('token', data.user.token); // Assuming the token is in data.token
        }
        return data.user.token || null; // Return the user data to be used in the reducer 
        // todo: redirect to the profile page
      } else {
        toast.warning(data.message);
        return thunkApi.rejectWithValue(data.message); // Reject with the error message
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(error); // Notify the user
      return thunkApi.rejectWithValue(error.message); // Reject with the error message  
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      }) 
  },
});

export const authReducer = authSlice.reducer;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoading = (state) => state.auth.loading;
