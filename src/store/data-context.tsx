/* eslint-disable */
import { createContext } from "react";
import data from "../data.json";

const Data = createContext({
  comments: data.comments,
  current_user: data.currentUser,
  edit: (
    idArr: number[],
    content: string,
    action: "COMMENT_EDIT" | "REPLY_EDIT"
  ) => {},
  remove: (idArr: number[], action: "COMMENT_REMOVE" | "REPLY_REMOVE") => {},
  reply: (
    idArr: number[],
    content: string,
    action: "REPLY_COMMENT" | "REPLY_REPLY"
  ) => {},
  send: () => {},
});

export default Data;
