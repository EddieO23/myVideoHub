import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner'


import backendApi from '../../api/backendApi';

const initialState = {
  video: [],
  publicVideo: [],
  isLoading: false,
  editVideo: null,
};

// Fetch videos for the public

export const fetchVideosForPublic = createAsyncThunk(
  'video/fetch-public-videos',
  async (_, thunkAPI) => {
    try {
      const { data } = await backendApi.get('/api/v1/fetch-videos');
      if (data.success) {
        return data.videos || [];
      }
      return thunkAPI.rejectWithValue(data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch videos';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideosForPublic.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchVideosForPublic.fulfilled, (state, action) => {
      state.publicVideo = action.payload; 
      state.isLoading = false;
    })
    .addCase(fetchVideosForPublic.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export const videoReducer = videoSlice.reducer;
export const selectPublicVideos = (state) => state.video.publicVideo;