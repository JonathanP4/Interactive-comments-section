import { createContext } from "react";
import data from "../data.json";

const initialValue = {
  comments: data.comments,
  current_user: data.currentUser,
  send: (a: string) => {
    a;
    return;
  },
  edit: (a: number[], content: string) => {
    a;
    content;
    return;
  },
  remove: (a: number[]) => {
    a;
    return;
  },
  reply: (a: number[], content: string) => {
    a;
    content;
    return;
  },
};

export const DataContext = createContext(initialValue);
