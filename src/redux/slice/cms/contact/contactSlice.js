import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all contacts action
export const fetchContact = createAsyncThunk(
  "contacts/fetchContact",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/website/contact/"
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a contact action
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/website/contact/create/",
        formData
      );
      return response.data.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const fetchContactById = createAsyncThunk(
  "contacts/fetchContactById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/contact/update/${id}/`
      );
      return response.data.result; // Make sure the API returns the correct structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Project Status
export const updateContactStatus = createAsyncThunk(
  "contacts/updateStatus",
  async ({ id, status }) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/website/contact/${id}/`,
      { status }
    );
    return response.data.result;
  }
);
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, ...data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/website/contact/update/${id}/`,
        data
      );
      return response.data.result; // Ensure this returns the updated contact data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/website/contact/delete/${id}/`
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Search contact action
export const searchContact = createAsyncThunk(
  "contacts/searchContact",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/website/contact/?search=${searchTerm}`
      );
      return response.data.result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux slice
const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    createStatus: null,
    updateStatus: null,
    deleteStatus: null,
    currentContact: null,
    createError: null,
    updateError: null,
    deleteError: null,
  },
  reducers: {
    fetchContactByIdSuccess: (state, action) => {
      state.currentContact = action.payload; // This should update the currentContact
    },
    setCurrentContact(state, action) {
      state.currentContact = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch contact by ID
      .addCase(fetchContactById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchContactById.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.currentContact = action.payload; // Make sure payload is correctly updating currentContact
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
        state.currentContact = null; // Reset if fetching fails
        state.fetchError = action.error.message; // Optional: Handle the error
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        state.list = state.list.map((contact) =>
          contact.id === updatedContact.id ? updatedContact : contact
        );
        if (state.currentContact.id === updatedContact.id) {
          state.currentContact = updatedContact;
        }
      })

      //create contact
      .addCase(createContact.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      })
      //update contact
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        if (!updatedContact || !updatedContact.id) return;

        // Update contact in the list
        const index = state.list.findIndex(
          (contact) => contact.id === updatedContact.id
        );

        if (index !== -1) {
          state.list[index] = updatedContact;
        }

        // Also update currentContact if necessary
        if (
          state.currentContact &&
          state.currentContact.id === updatedContact.id
        ) {
          state.currentContact = updatedContact;
        }
      })

      .addCase(updateContact.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update contact";
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.list = state.list.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        // state.deleteStatus = "failed";
        state.deleteError = action.payload;
      })

      // Search contact
      .addCase(searchContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(searchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;
