import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = storeSlice.actions;
export default storeSlice.reducer;