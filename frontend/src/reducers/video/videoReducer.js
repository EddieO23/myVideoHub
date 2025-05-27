import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import backendApi from '../../api/backendApi';

const initialState = {
  publicVideo: [],
  isLoading: false,
  error: null,
};

export const fetchVideosForPublic = createAsyncThunk(
  'video/fetch-public-videos',
  async (_, thunkAPI) => {
    try {
      const response = await backendApi.get('/api/v1/fetch-videos');
      
      if (response.data.success) {
        return response.data.videos || [];
      }
      
      return thunkAPI.rejectWithValue(response.data.message);
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
    builder
      .addCase(fetchVideosForPublic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideosForPublic.fulfilled, (state, action) => {
        state.publicVideo = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchVideosForPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.publicVideo = [];
        state.error = action.payload || 'An error occurred';
        toast.error(action.payload || 'Failed to fetch videos');
      });
  },
});

export const videoReducer = videoSlice.reducer;
export const selectPublicVideos = (state) => state.video.publicVideo;
