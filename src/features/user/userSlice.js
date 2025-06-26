import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

// Helper function to get user's geolocation
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Async thunk to fetch user address based on geolocation
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1. Get the user's current position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2. Use reverse geocoding to get a human-readable address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality || ""}, ${addressObj?.city || ""} ${addressObj?.postcode || ""}, ${addressObj?.countryName || ""}`.trim();

    // 3. Return the data we need
    return { position, address };
  }
);

// Initial state
const initialState = {
  username: "",
  position: {},
  address: "",
  status: "idle", // 'idle' | 'loading' | 'error'
  error: "",
};

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "📍 Unable to fetch your address. Please enable location access or enter it manually.";
      }),
});

// Export actions and reducer
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
