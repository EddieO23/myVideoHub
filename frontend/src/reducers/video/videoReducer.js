import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import backendApi from '../../api/backendApi';

const initialState = {
  publicVideo: [],
  isLoading: false,
  error: null,
};

// Fetch videos for signed in user

export const fetchVideosForUser = createAsyncThunk(
  '/video/fetch-user-videos',
  async (payload, thunkAPI) => {
    try {
      const { configWithJwt } = payload;
      const { data } = await backendApi.get(
        '/api/v1/aws/fetch-videos',
        configWithJwt
      );
      if (data.success) {
        return data.videos || [];
      }
      return thunkAPI.rejectWithValue(data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong...';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// AI response
// export const fetchVideosForUser = createAsyncThunk(
//   '/video/fetch-user-videos',
//   async (payload = {}, thunkAPI) => {
//     try {
//       // Destructure with default empty object
//       const { configWithJwt = {} } = payload;

//       // Merge default config with passed config
//       const config = {
//         ...configWithJwt,
//         // You can add default configurations here
//         // timeout: 5000,
//         // other default settings
//       };

//       const {data} = await backendApi.get('/api/v1/aws/fetch-videos', config)

//       if(data.success) {
//         return data.videos || []
//       }

//       return thunkAPI.rejectWithValue(data.message)
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Something went wrong...'
//       return thunkAPI.rejectWithValue(errorMessage)
//     }
//   }
// )

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
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch videos';
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// download video

export const downloadVideo = createAsyncThunk(
  'video/download',
  async (payload, thunkAPI) => {
    try {
      const { id } = payload;
      const state = thunkAPI.getState();
      const queryParams = state.auth.loggedInUser
        ? `?userId=${encodeURIComponent(state.auth.loggedInUser._id)}`
        : '';
      const response = await backendApi.get(
        `/api/v1/download/file/${id}${queryParams}`,
        {
          responseType: 'blob',
        }
      );
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
        : 'video.mp4';
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// deleting a given video

export const deleteVideo = createAsyncThunk(
  'video/delete',
  async ({ id, configWithJWT }, thunkAPI) => {
    try {
      const { data } = await backendApi.delete(
        `/api/v1/aws/delete-single/video/${id}`,
        configWithJWT
      );

      if (data.success) {
        return { id };
      }
      return thunkAPI.rejectWithValue(data.message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// updating a given video

export const updateVideo = createAsyncThunk(
  'video/update',
  async ({ id, updateData, configWithJwt }, thunkAPI) => {
    try {
      const formData = new FormData();

      if (updateData.path instanceof File) {
        formData.append('video', updateData.path);
      }
      if (updateData.thumbnail instanceof File) {
        formData.append('thumbnail', updateData.thumbnail);
      }
      if (updateData.title) formData.append('title', updateData.title);
      if (updateData.description)
      formData.append('description', updateData.description);
      formData.append('isPrivate', String(updateData.isPrivate));
      const { data } = await backendApi.put(
      `/api/v1/aws/update-video/${id}`,
      formData,
      {
        ...configWithJwt,
        headers: {
          ...configWithJwt.headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if(data.success && data.video) {
      toast.success(data.message)
    }
    return thunkAPI.rejectWithValue(data.message)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setEditVideo: (state, action) => {
      state.editVideo = action.payload;
    },
  },
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
      })
      .addCase(fetchVideosForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideosForUser.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVideosForUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos =
          state.videos?.filter((video) => video._id !== action.payload.id) ||
          null;
      });
  },
});

export const videoReducer = videoSlice.reducer;
export const { setEditVideo } = videoSlice.actions;
export const selectPublicVideos = (state) => state.video.publicVideo;
export const selectUserVideos = (state) => state.video.videos;
export const selectVideoLoading = (state) => state.video.isLoading;
export const selectEditingVideo = (state) => state.video.editVideo;
