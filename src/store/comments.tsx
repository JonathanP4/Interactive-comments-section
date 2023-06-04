import { createSlice, configureStore } from "@reduxjs/toolkit";
import data from "../data.json";
import { CommentType } from "../types/types";

export const actionTypes = {
  comment: "COMMENT",
  reply: "REPLY",
};

function sendToLocalStorage(comments: CommentType[]) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

localStorage.setItem("currentUser", JSON.stringify(data.currentUser));

const localStorageComments =
  localStorage.getItem("comments") || JSON.stringify(data.comments);
const localStorageCurrentUser =
  localStorage.getItem("currentUser") || JSON.stringify(data.currentUser);

const currentUser = JSON.parse(localStorageCurrentUser);
const comments: CommentType[] = JSON.parse(localStorageComments);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments,
    current_user: currentUser,
  },
  reducers: {
    edit(state, action) {
      if (action.payload.type === actionTypes.comment) {
        const currentComment = state.comments[action.payload.index];

        currentComment.content = action.payload.content;
      }

      if (action.payload.type === actionTypes.reply) {
        const [commentIndex, replyIndex] = action.payload.index;

        state.comments[commentIndex].replies[replyIndex].content =
          action.payload.content;
      }
      sendToLocalStorage(state.comments);
    },

    delete(state, action) {
      if (action.payload.type === actionTypes.comment) {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
      }

      if (action.payload.type === actionTypes.reply) {
        const currentComment = state.comments[action.payload.index];

        currentComment.replies = currentComment.replies.filter(
          (reply) => reply.id !== action.payload.id
        );
      }
      sendToLocalStorage(state.comments);
    },

    reply(state, action) {
      const currentComment = state.comments[action.payload.index];
      const id =
        currentComment.replies.length > 0
          ? currentComment.replies.at(-1)!.id + 1
          : currentComment.id + 1;

      const replyData = {
        id,
        content: action.payload.content,
        createdAt: 'now',
        score: 0,
        replyingTo: action.payload.mention,
        user: {
          image: {
            png: state.current_user.image.png,
            webp: state.current_user.image.webp,
          },
          username: state.current_user.username,
        },
      };
      currentComment.replies.push(replyData);
      sendToLocalStorage(state.comments);
    },

    comment(state, action) {
      state.comments.push(action.payload);
      sendToLocalStorage(state.comments);
    },
  },
});

const store = configureStore({
  reducer: commentsSlice.reducer,
});

export default store;
export const commentActions = commentsSlice.actions;
