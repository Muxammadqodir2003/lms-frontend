import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  category: string | null;
  level: string | null;
  language: string | null;
  rating: string | null;
  search: string | null;
  page: number;
}

const initialState: InitialState = {
  category: null,
  level: null,
  language: null,
  rating: null,
  search: null,
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
    filterBySearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearFilters: (state) => {
      state.category = null;
      state.level = null;
      state.language = null;
      state.rating = null;
      state.search = null;
    },
  },
});

export const {
  filterByCategory,
  filterByLevel,
  filterByLanguage,
  filterByRating,
  filterBySearch,
  setPage,
  clearFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
