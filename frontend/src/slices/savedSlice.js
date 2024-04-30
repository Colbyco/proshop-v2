import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('saved') 
  ? { savedItems: JSON.parse(localStorage.getItem('saved')) } 
  : { savedItems: [] };

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addToSaved: (state, action) => {
        const newItem = action.payload;
        const existItemIndex = state.savedItems.findIndex(
          (item) => item._id === newItem._id
        );
        if (existItemIndex !== -1) {
          // If the item already exists, update it in the array
          state.savedItems[existItemIndex] = newItem;
        } else {
          // If the item doesn't exist, append it to the existing array
          state.savedItems.push(newItem);
        }
        // Update local storage with the updated savedItems array
        localStorage.setItem('saved', JSON.stringify(state.savedItems));
      },
        removeFromSaved: (state, action) => {
        state.savedItems = state.savedItems.filter(
            (item) => item._id !== action.payload
        );
        localStorage.setItem('saved', JSON.stringify(state.savedItems));
         },
    
  }
});

export const { addToSaved, removeFromSaved } = savedSlice.actions;

export default savedSlice.reducer;