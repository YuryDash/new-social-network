import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { profileAPI } from "features/main/profile/api/profileAPI";
import moment from "moment";

export type ProfileType = {
  posts: PostType[];
  profile: ProfileInfoType;
  status: string;
};
export type PostType = {
  postID: string;
  postMessage: string;
  date: string;
};
export type ProfileInfoType = {
  aboutMe: string;
  contacts: {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};

const slice = createSlice({
  name: "profile",
  initialState: {
    posts: [
      {
        postID: v1(),
        postMessage: "Всё будет гладко, растает снег найдется закладка",
        date: "2023-09-27 10:59:43",
      },
      {
        postID: v1(),
        postMessage: "Царствие тебе панельное",
        date: "2023-09-27 10:59:43",
      },
    ],
    status: "",
    profile: {} as ProfileInfoType,
  },

  reducers: {
    addPost: (state, action: PayloadAction<{ message: string }>) => {
      const currentDate = moment();
      const newPost: PostType = {
        postID: v1(),
        postMessage: action.payload.message,
        date: currentDate.format("YYYY-MM-DD HH:mm:ss"), // Преобразуем дату в строку формата ISO для сохранения в состоянии
      };
      state.posts.unshift(newPost);
    },
    changePost: (state, action: PayloadAction<{ newPost: string; id: string }>) => {
      const index = state.posts.findIndex((post) => post.postID === action.payload.id);
      if (index !== -1) state.posts[index].postMessage = action.payload.newPost;
    },
    removePost: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.posts.findIndex((post) => post.postID === action.payload.id);
      if (index !== -1) state.posts.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.status = action.payload.status;
      });
  },
});

const getProfile = createAsyncThunk<{ profile: ProfileInfoType }, { userID: number }>(
  "profile/getProfile",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await profileAPI.getProfile(arg.userID);
      console.log(res);
      if (res.data.userId) {
        return { profile: res.data };
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

const getStatus = createAsyncThunk<
  { status: string },
  {
    userID: number;
  }
>("profile/getStatus", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await profileAPI.getStatus(arg.userID);
    if (res.data) {
      return { status: res.data };
    } else {
      return rejectWithValue(null);
    }
  } catch (e) {
    return rejectWithValue(null);
  }
});

const changeStatus = createAsyncThunk<{ status: string }, { status: string }>(
  "profile/changeStatus",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { status } = arg;
    try {
      const res = await profileAPI.updateStatus(status);
      if (res.data.resultCode === 0) {
        return { status };
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  },
);

export const profileActions = slice.actions;
export const profileReducer = slice.reducer;
export const profileThunks = { getProfile, getStatus, changeStatus };
