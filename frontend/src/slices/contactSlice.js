import { apiSlice } from './apiSlice'; // Import apiSlice from the appropriate file

export const contactSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (formData) => ({
        url: '/api/contact',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});
export const {useSubmitContactFormMutation} = contactSlice;
