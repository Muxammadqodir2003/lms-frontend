import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import coursesReducer from "./courses/courses.slice";
import { baseAuthApi } from "@/services/baseAuthApi";
import { baseApi } from "@/services/baseApi";

export const store = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      courses: coursesReducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [baseAuthApi.reducerPath]: baseAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(baseApi.middleware)
        .concat(baseAuthApi.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
