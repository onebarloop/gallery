import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  value: boolean;
}

const initialState: PopupState = {
  value: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    switchPopup: (state) => {
      state.value = !state.value;
    },
  },
});

export default popupSlice.reducer;

export const { switchPopup } = popupSlice.actions;
