import React, { useContext } from "react";
import useMatchups  from "../matchups/useMatchups";
import { useUser } from "../../auth/useUser";
import { useToken } from "../../auth/useToken";
import { useProfileData } from "../../auth/useProfileData";

const StateContext = React.createContext(undefined);
export const StateProvider = ({ children }) => {
  const stateHooks = {
    matchups: useMatchups(),
    user: useUser(),
    token: useToken(),
    profile: useProfileData({}),
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