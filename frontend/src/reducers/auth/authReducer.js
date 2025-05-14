import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  loggedInUser: null,
  loading: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const authReducer = authSlice.reducer
export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectLoading = (state) => state.auth.loading