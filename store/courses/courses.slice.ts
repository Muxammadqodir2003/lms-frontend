import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./courses.interface";

const initialState: InitialState = {
  allCourses: [],
  courses: [],
  search: "",
  category: null,
  level: null,
  language: null,
  rating: null,
};

const applyAllFilters = (state: InitialState) => {
  let filtered = state.allCourses;

  if (state.search) {
    filtered = filtered.filter(
      (course) =>
        course.title === state.search || course.description === state.search
    );
  }

  if (state.category) {
    filtered = filtered.filter((course) => course.category === state.category);
  }

  if (state.level) {
    filtered = filtered.filter((course) => course.level === state.level);
  }

  if (state.language) {
    filtered = filtered.filter((course) => course.language === state.language);
  }

  if (state.rating) {
    filtered = filtered.filter(
      (course) => String(course.rating) === state.rating
    );
  }

  state.courses = filtered;
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    searchByQuery: (state, action) => {
      state.search = action.payload;
      applyAllFilters(state);
    },
    filterByCategory: (state, action) => {
      state.category = action.payload;
      console.log(state, action);
      applyAllFilters(state);
    },
    filterByLevel: (state, action) => {
      state.level = action.payload;
      applyAllFilters(state);
    },
    filterByLanguage: (state, action) => {
      state.language = action.payload;
      applyAllFilters(state);
    },
    filterByRating: (state, action) => {
      state.rating = String(action.payload);
      applyAllFilters(state);
    },
  },
});

export const {
  filterByCategory,
  searchByQuery,
  filterByLevel,
  filterByLanguage,
  filterByRating,
} = coursesSlice.actions;
export default coursesSlice.reducer;
