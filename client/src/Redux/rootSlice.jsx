import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    loading: false,
    PortfolioData: null,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.PortfolioData = action.payload;
    },
  },
});

export const { showLoading, hideLoading, setPortfolioData } = rootSlice.actions;
export default rootSlice.reducer;
