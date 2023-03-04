// Importing axios for making API calls and importing various Redux actions from 'products' slice.
import axios from "axios";

import {
  setProducts,
  setLoading,
  setError,
  setProduct,
  productReviewed,
  resetError,
  questionReviewed,
  questionResetError,
} from "../slices/products";

// An async action creator that fetches all products from the server.
export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products`);
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// An async action creator that fetches a single product from the server.
export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// An async action creator that creates a new review for a product.
export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(productReviewed());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// An async action creator that creates a new question for a product.
export const createQuestionReview =
  (productId, userId, questionsComment, questionsTitle) => async (dispatch, getState) => {
    dispatch(setLoading());
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/products/questions/${productId}`,
        { questionsComment, userId, questionsTitle },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(questionReviewed());
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };

// An async action creator that resets the product error state.
export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};

// An async action creator that resets the question error state.
export const resetQuestionError = () => async (dispatch) => {
  dispatch(questionResetError());
};
