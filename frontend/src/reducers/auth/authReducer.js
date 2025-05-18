import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import backendApi from '../../api/backendApi.js';
import { useNavigate } from "react-router-dom";


const initialState = { 
  loggedInUser: null,
  loading: false,
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
      const { email, password, navigate } = payload;
      const { data } = await backendApi.post('/api/v1/auth/sign-in', {
        email,
        password,
      });
      if (data.success && data.user?.token) {
        if (data.user) {
          toast.success(data.message);
          localStorage.setItem('token', data.user.token); // Assuming the token is in data.token
          navigate('/user/profile')
        }
        return data.user; // Return the user data to be used in the reducer
      } else {
        toast.warning(data.message);
        return thunkApi.rejectWithValue(data.message); // Reject with the error message
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage); // Notify the user
      return thunkApi.rejectWithValue(errorMessage); // Reject with the error message
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'auth/fetch-user-details',
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkApi.rejectWithValue('No authorization token found'); // Reject with an error message
      }
      const { data } = await backendApi.get('/api/v1/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        return data.user; // Return the user data to be used in the reducer
      } else {
        return thunkApi.rejectWithValue(data.message); // Reject with the error message
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage); // Notify the user
      return thunkApi.rejectWithValue(errorMessage); // Reject with the error message
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     logOutUser: (state, action) => {
      const navigate = action.payload
      localStorage.removeItem("token");
      state.loggedInUser = null;
      toast.info("We will miss you");
      navigate('/sign-in')
    },
    updateUser : (state, action) => {
      const {name, email} = action.payload
      if(state.loggedInUser) {

        state.loggedInUser.name = name
        state.loggedInUser.email = email
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {logOutUser,updateUser} = authSlice.actions
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoading = (state) => state.auth.loading;
