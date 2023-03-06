// **Coded by Supriya Sharma**//

// import axios library for making HTTP requests
import axios from "axios";

// import various action creators from the user slice
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} from "../slices/user";

// define the login function, which takes an email and password and returns an async function
export const login = (email, password) => async (dispatch) => {
  // dispatch the setLoading action creator with a value of true to indicate that the login request is in progress
  dispatch(setLoading(true));
  try {
    // define a config object with a header that specifies the content type as JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // make a POST request to the "/api/users/login" endpoint with the provided email and password as data, and the config object as options
    const { data } = await axios.post("/api/users/login", { email, password }, config);

    // dispatch the userLogin action creator with the returned data as its argument to update the state with the logged in user's information
    dispatch(userLogin(data));

    // store the returned user information in local storage for future reference
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // if there is an error, dispatch the setError action creator with an appropriate error message based on the error type
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// define the logout function, which takes no arguments and returns a function that dispatches the userLogout action creator and removes the user information from local storage
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

// define the register function, which takes a name, email, and password and returns an async function
export const register = (name, email, password) => async (dispatch) => {
  // dispatch the setLoading action creator with a value of true to indicate that the registration request is in progress
  dispatch(setLoading(true));
  try {
    // define a config object with a header that specifies the content type as JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // make a POST request to the "/api/users/register" endpoint with the provided name, email, and password as data, and the config object as options
    const { data } = await axios.post("/api/users/register", { name, email, password }, config);

    // dispatch the userLogin action creator with the returned data as its argument to update the state with the newly registered user's information
    dispatch(userLogin(data));

    // store the returned user information in local storage for future reference
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // if there is an error, dispatch the setError action creator with an appropriate error message based on the error type
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// This code defines the updateProfile function, which takes an id, name, email, and password as input and returns an async function that dispatches the updateUserProfile action after making an API call to update the user's profile information in the backend database.
export const updateProfile = (id, name, email, password) => async (dispatch, getSate) => {
  const {
    user: { userInfo },
  } = getSate();

  try {
    const config = {
      headers: {
        // includes the user's authorization token in the headers for authentication
        Authorization: `Bearer ${userInfo.token}`,

        // sets the content type of the request to JSON
        "Content-Type": "application/json",
      },
    };

    // makes an API call using axios to update the user's profile with the given id, name, email, and password, and with the config object as options
    const { data } = await axios.put(`/api/users/profile/${id}`, { _id: id, name, email, password }, config);

    // stores the updated user's info in the local storage
    localStorage.setItem("userInfo", JSON.stringify(data));

    // dispatches the updateUserProfile action with the updated user's info as payload
    dispatch(updateUserProfile(data));
  } catch (error) {
    dispatch(
      // dispatches the setError action with an error message if the API call fails
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// This code defines the resetUpdateSuccess function, which dispatches the resetUpdate action.
export const resetUpdateSuccess = () => async (dispatch) => {
  // dispatches the resetUpdate action
  dispatch(resetUpdate());
};

// **Coded by Daniel Wilkey** //
// This code defines the getUserOrders function, which returns an async function that dispatches the setUserOrders action after making an API call to get the user's orders from the backend database.
export const getUserOrders = () => async (dispatch, getSate) => {
  // sets loading to true while the API call is being made
  dispatch(setLoading(true));
  const {
    // gets the user's info from the state using getState()
    user: { userInfo },
  } = getSate();

  try {
    const config = {
      // includes the user's authorization token in the headers for authentication
      headers: {
        Authorization: `Bearer ${userInfo.token}`,

        // sets the content type of the request to JSON
        "Content-Type": "application/json",
      },
    };

    // makes an API call using axios to get the user's orders with the given user ID, and with the config object as options
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);

    // dispatches the setUserOrders action with the user's orders as payload
    dispatch(setUserOrders(data));

    // dispatches the setError action with an error message if the API call fails
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};
