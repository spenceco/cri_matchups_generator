import React, { useContext } from "react";
import useMatchups  from "./useMatchups";

const StateContext = React.createContext(undefined);
export const StateProvider = ({ children }) => {
  const stateHooks = {
    matchups: useMatchups()
  };
  return (
    <StateContext.Provider value={stateHooks}>
      {children}
    </StateContext.Provider>
  );
};
// curry the Context
export const useStateHooks = () => {
  return useContext(StateContext);
};