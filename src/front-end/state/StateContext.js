import React, { useContext } from "react";
import useMatchups  from "../matchups/state/useMatchups";
import { useUser } from "../../auth/useUser";
import { useToken } from "../../auth/useToken";

const StateContext = React.createContext(undefined);
export const StateProvider = ({ children }) => {
  const stateHooks = {
    matchups: useMatchups(),
    user: useUser(),
    token: useToken(),
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