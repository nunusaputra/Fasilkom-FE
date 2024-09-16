import { createSlice } from "@reduxjs/toolkit";
import { getDospem, getDospemById, updateDospem } from "../Action/DospemAction";

const initialState = {
  dospem: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const dospemSlice = createSlice({
  name: "dospem",
  initialState,
  reducers: {
    resetDospem: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get All Dospem Builder
    builder.addCase(getDospem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDospem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dospem = action.payload;
    });
    builder.addCase(getDospem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Dospem By Id Builder
    builder.addCase(getDospemById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDospemById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.dospem = action.payload;
    });
    builder.addCase(getDospemById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Dospem Builder
    builder.addCase(updateDospem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDospem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateDospem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetDospem } = dospemSlice.actions;
export default dospemSlice.reducer;
