import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signOutThunk = () => (dispatch, getState) => {
  const { refreshToken } = getState().auth;
  axios.delete(`/auth/refreshtokens/${refreshToken}`).then((res) => dispatch(signOut()));
};

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiresInSeconds: "",
  _id: "",
  name: "",
  email: "",
};

const authentication = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      return action.payload;
    },
    signOut: (state) => {
      return initialState;
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { signIn, signOut, refresh } = authentication.actions;

export default authentication.reducer;
