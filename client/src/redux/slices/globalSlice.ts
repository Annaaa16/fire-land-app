import { createSlice } from '@reduxjs/toolkit';

// types
import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isExpired: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setExpToken: (state, action: PayloadAction<boolean>) => {
      console.log('action.payload', action.payload);
      state.isExpired = action.payload;
    },
  },
});

export const { setExpToken } = globalSlice.actions;

export default globalSlice.reducer;
