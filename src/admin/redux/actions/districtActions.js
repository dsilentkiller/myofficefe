import axios from "axios";

// Action Types
export const FETCH_DISTRICTS_REQUEST = "FETCH_DISTRICTS_REQUEST";
export const FETCH_DISTRICTS_SUCCESS = "FETCH_DISTRICTS_SUCCESS";
export const FETCH_DISTRICTS_FAILURE = "FETCH_DISTRICTS_FAILURE";

// Action Creators
export const fetchDistrictsRequest = () => ({
  type: FETCH_DISTRICTS_REQUEST,
});

export const fetchDistrictsSuccess = (districts) => ({
  type: FETCH_DISTRICTS_SUCCESS,
  payload: districts,
});

export const fetchDistrictsFailure = (error) => ({
  type: FETCH_DISTRICTS_FAILURE,
  payload: error,
});

// Async Action to Fetch Districts from Backend
export const fetchDistricts = () => {
  return async (dispatch) => {
    dispatch(fetchDistrictsRequest());
    try {
      const response = await axios.get(
        "http://localhost:8000/api/setup/district/"
      );
      dispatch(fetchDistrictsSuccess(response.data));
    } catch (error) {
      dispatch(fetchDistrictsFailure(error.message));
    }
  };
};
