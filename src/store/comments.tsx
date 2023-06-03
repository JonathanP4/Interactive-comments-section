import { createSlice, configureStore } from "@reduxjs/toolkit";
import data from "../data.json";

export const actionTypes = {
  comment: "COMMENT",
  reply: "REPLY",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: data.comments, current_user: data.currentUser },
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
        createdAt: "now",
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
    },

    comment(state, action) {
      state.comments.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: commentsSlice.reducer,
});

export default store;
export const commentActions = commentsSlice.actions;
