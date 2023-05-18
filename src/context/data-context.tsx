import { createContext } from "react";
import data from "../data.json";

const initialValue = {
  comments: data.comments,
  current_user: data.currentUser,
  send: (a: string) => {
    return;
  },
  edit: (a: number[], content: string) => {
    return;
  },
  remove: (a: number[]) => {
    return;
  },
  reply: (a: number[], content: string) => {
    return;
  },
};

export const DataContext = createContext(initialValue);
