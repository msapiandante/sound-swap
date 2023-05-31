import React, { createContext, useContext } from "react";
import { useUploadReducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useUploadReducer({
    uploads: [],
    cart: [],
    cartOpen: false,
    genres: [],
    currentGenre: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };