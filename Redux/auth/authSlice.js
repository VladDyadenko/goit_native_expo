import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
  nickname: null,
  currentUser: false,
  userEmail: "",
  userAvatar: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      userAvatar: payload.userAvatar,
    }),
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),
    authCurrentUser: (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }),
    authLogOut: () => userInitialState,
  },
});
