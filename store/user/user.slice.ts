import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./user.interface";

const initialState: InitialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.accessToken;

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
  },
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
