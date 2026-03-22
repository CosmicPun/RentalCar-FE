import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookState {
  bookItems: BookingItem[];
}

const initialState: BookState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      // Find if a booking for the same venue and date already exists
      const existingIndex = state.bookItems.findIndex(
        item => item.venue === action.payload.venue && item.bookDate === action.payload.bookDate
      );
      
      if (existingIndex !== -1) {
        // Replace existing booking
        state.bookItems[existingIndex] = action.payload;
      } else {
        // Add new booking
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      // Remove the booking if all fields match exactly
      state.bookItems = state.bookItems.filter(
        item => 
          item.nameLastname !== action.payload.nameLastname ||
          item.tel !== action.payload.tel ||
          item.venue !== action.payload.venue ||
          item.bookDate !== action.payload.bookDate
      );
    }
  }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;