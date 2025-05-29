import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../admin/api/axiosInstance"; // use shared axiosInstance Multi-tenant aware

// API URL (Replace with the actual API URL)

// Initial state for proposals
const initialState = {
  proposals: [], // List of all proposals
  currentProposal: null, // Current proposal for viewing/editing
  status: "idle", // Status for the proposal fetching operation
  error: null, // General error message
  createStatus: null, // Status for create operation
  updateStatus: null, // Status for update operation
  deleteStatus: null, // Status for delete operation
  createError: null, // Error for create operation
  updateError: null, // Error for update operation
  deleteError: null, // Error for delete operation
};

export const fetchProposals = createAsyncThunk(
  "proposal/fetchProposals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/proposal/");
      console.log("API Response:", response.data); // Log the response data
      return response.data.result || []; // Make sure the structure is correct
    } catch (error) {
      console.error("Error fetching proposals:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new proposal
export const createProposal = createAsyncThunk(
  "proposals/createProposal",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/proposal/create/",
        formData
      );
      return response.data; // Assuming the created proposal is in the 'result' field
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch a proposal by ID
export const fetchProposalById = createAsyncThunk(
  "proposals/fetchProposalById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/detail/${id}/`);
      return response.data.result; // Assuming 'result' contains the proposal
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing proposal
export const updateProposal = createAsyncThunk(
  "proposals/updateProposal",
  async ({ id, ...formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`api/update/${id}/`, formData);
      return response.data.result; // Assuming 'result' is the updated proposal
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a proposal
export const deleteProposal = createAsyncThunk(
  "proposals/deleteProposal",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`api/delete/${id}/`);
      return id; // Returning the id to remove the proposal from the list
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Redux Slice
const proposalSlice = createSlice({
  name: "proposals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all proposals
    builder.addCase(fetchProposals.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProposals.fulfilled, (state, action) => {
      console.log("Fetched proposals in reducer:", action.payload);
      state.status = "succeeded";
      state.proposals = action.payload;
    });

    builder.addCase(fetchProposals.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Fetch a single proposal by ID
    builder
      .addCase(fetchProposalById.fulfilled, (state, action) => {
        state.currentProposal = action.payload;
      })

      // Create a new proposal
      // builder.addCase(createProposal.fulfilled, (state, action) => {
      // state.proposals.push(action.payload);
      // state.createStatus = 'succeeded';
      // builder.addCase(createProposal.fulfilled, (state, action) => {
      //   state.push(action.payload);  // Add the new proposal to the state
      // });
      // // });
      // builder.addCase(createProposal.fulfilled, (state, action) => {
      //   state.push(action.payload);  // Add the new proposal to the state
      // });
      .addCase(createProposal.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        // Ensure state.proposals is always an array when this code executes
        if (Array.isArray(state.proposals)) {
          state.proposals.push(action.payload);
        } else {
          // Handle the case where state.proposals is not an array
          state.proposals = [action.payload];
        }
      });

    builder.addCase(createProposal.rejected, (state, action) => {
      state.createStatus = "failed";
      state.createError = action.payload;
    });

    // Update an existing proposal
    builder.addCase(updateProposal.fulfilled, (state, action) => {
      const index = state.proposals.findIndex(
        (proposal) => proposal.id === action.payload.id
      );
      if (index !== -1) {
        state.proposals[index] = action.payload;
      }
      state.updateStatus = "succeeded";
    });
    builder.addCase(updateProposal.rejected, (state, action) => {
      state.updateStatus = "failed";
      state.updateError = action.payload;
    });

    // Delete a proposal
    builder.addCase(deleteProposal.fulfilled, (state, action) => {
      state.proposals = state.proposals.filter(
        (proposal) => proposal.id !== action.payload
      );
      state.deleteStatus = "succeeded";
    });
    builder.addCase(deleteProposal.rejected, (state, action) => {
      state.deleteStatus = "failed";
      state.deleteError = action.payload;
    });
  },
});

// Export selectors to access proposal data from the state
export const selectAllProposals = (state) => state.proposals.proposals;
export const selectCurrentProposal = (state) => state.proposals.currentProposal;
export const selectProposalStatus = (state) => state.proposals.status;
export const selectProposalError = (state) => state.proposals.error;
export const selectCreateStatus = (state) => state.proposals.createStatus;
export const selectUpdateStatus = (state) => state.proposals.updateStatus;
export const selectDeleteStatus = (state) => state.proposals.deleteStatus;
export const selectCreateError = (state) => state.proposals.createError;
export const selectUpdateError = (state) => state.proposals.updateError;
export const selectDeleteError = (state) => state.proposals.deleteError;

// Export async actions
// export {createProposal, fetchProposalById, updateProposal, deleteProposal };

// Export the reducer for the proposal slice
export default proposalSlice.reducer;
