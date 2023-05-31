import { useReducer } from 'react';
import {
  UPDATE_UPLOADS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_GENRE,
  UPDATE_CURRENT_GENRE,
  CLEAR_CART,
} from './actions';


export const reducer = (state, action) => {
  switch (action.type) {

    case UPDATE_UPLOADS:
      return {
        ...state,
        uploads: [...action.uploads],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.upload],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.uploads],
      };
    
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((upload) => {
          if (action._id === upload._id) {
            upload.purchaseQuantity = action.purchaseQuantity;
          }
          return upload;
        }),
      };

    
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((upload) => {
        return upload._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    


    case UPDATE_GENRE:
      return {
        ...state,
        genres: [...action.genre],
      };

    case UPDATE_CURRENT_GENRE:
      return {
        ...state,
        currentGenre: action.currentGenre,
      };

    default:
      return state;
  }
};

export function useUploadReducer(initialState) {
  return useReducer(reducer, initialState);
}