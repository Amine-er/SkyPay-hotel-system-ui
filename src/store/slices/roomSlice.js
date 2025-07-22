import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    selected: null,
    reservationDates: {
      checkInDate: '',
      checkOutDate: '',
    },
  },
  reducers: {
    selectRoom(state, action) {
      state.selected = action.payload;
    },
    clearRoom(state) {
      state.selected = null;
      state.reservationDates = {
        checkInDate: '',
        checkOutDate: '',
      };
    },
    setReservationDates(state, action) {
      state.reservationDates = action.payload;
    },
    clearReservationDates(state) {
      state.reservationDates = {
        checkInDate: '',
        checkOutDate: '',
      };
    },
  },
});

export const {
  selectRoom,
  clearRoom,
  setReservationDates,
  clearReservationDates,
} = roomSlice.actions;
export default roomSlice.reducer;
