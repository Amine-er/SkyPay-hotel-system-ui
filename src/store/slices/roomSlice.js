import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: { selected: null },
  reducers: {
    selectRoom(state, action) {
      state.selected = action.payload;
    },
    clearRoom(state) {
      state.selected = null;
    },
  },
});

export const { selectRoom, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
