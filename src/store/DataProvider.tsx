import { ReactNode, SetStateAction, createContext, useState } from "react";
import data from "../data.json";
import { DataType } from "../types/types";

export const Data = createContext({
  comments: data.comments,
  current_user: data.currentUser,

  update: (a: SetStateAction<DataType>): unknown => {
    return a;
  },
});

function DataProvider(props: { children: ReactNode }) {
  const [state, setState] = useState(data);
  const contextValue = {
    comments: state.comments,
    current_user: state.currentUser,
    update: setState,
  };
  return <Data.Provider value={contextValue}>{props.children}</Data.Provider>;
}

export default DataProvider;
