import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./course.interface";

const initialState: InitialState = {
  course: null,
  sections: [],
  lessons: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
});
