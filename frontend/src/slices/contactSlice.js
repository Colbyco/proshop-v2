import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit form';
      });
  }
});

export default contactSlice.reducer;
