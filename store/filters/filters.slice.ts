import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  category: string | null;
  level: string | null;
  language: string | null;
  rating: string | null;
  page: number;
}

const initialState: InitialState = {
  category: null,
  level: null,
  language: null,
  rating: null,
  page: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.category = action.payload;
    },
    filterByLevel: (state, action) => {
      state.level = action.payload;
    },
    filterByLanguage: (state, action) => {
      state.language = action.payload;
    },
    filterByRating: (state, action) => {
      state.rating = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  filterByCategory,
  filterByLevel,
  filterByLanguage,
  filterByRating,
  setPage,
} = filtersSlice.actions;
export default filtersSlice.reducer;
