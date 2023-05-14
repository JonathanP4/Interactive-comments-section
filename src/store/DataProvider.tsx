import { ReactNode } from "react";
import { CommentType } from "../types/types";
import DataContext from "./data-context";
import { useReducer } from "react";
import data from "../data.json";

type State = {
  comments: CommentType[];
  current_user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

type Action = {
  type: "EDIT" | "REMOVE" | "REPLY" | "COMMENT";
  payload: {
    indexArr: number[];
    content: string;
  };
};

const defaultState = {
  comments: data.comments,
  current_user: data.currentUser,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "EDIT": {
      if (action.payload.indexArr.length === 2) {
        const [cIndex, rIndex] = action.payload.indexArr;
        state.comments[cIndex].replies[rIndex].content = action.payload.content;
      } else {
        const [cIndex] = action.payload.indexArr;
        state.comments[cIndex].content = action.payload.content;
      }
      return {
        comments: state.comments,
        current_user: data.currentUser,
      };
    }
    case "REMOVE": {
      if (action.payload.indexArr.length === 2) {
        const [cIndex, replyId] = action.payload.indexArr;
        state.comments[cIndex].replies = state.comments[cIndex].replies.filter(
          (reply) => reply.id !== replyId
        );
      } else {
        const [commentId] = action.payload.indexArr;
        state.comments = state.comments.filter(
          (comment) => comment.id !== commentId
        );
      }
      return {
        comments: state.comments,
        current_user: data.currentUser,
      };
    }
    case "REPLY": {
      if (action.payload.indexArr.length === 2) {
        const [cIndex, replyId] = action.payload.indexArr;
        state.comments[cIndex].replies = state.comments[cIndex].replies.filter(
          (reply) => reply.id !== replyId
        );
      } else {
        const [commentIndex] = action.payload.indexArr;
        const curComment = state.comments[commentIndex];
        const id = curComment.replies.length + (curComment.id + 1);

        curComment.replies.push({
          id: id,
          content: action.payload.content,
          createdAt: "now",
          score: 0,
          replyingTo: curComment.user.username,
          user: {
            image: {
              png: state.current_user.image.png,
              webp: state.current_user.image.webp,
            },
            username: state.current_user.username,
          },
        });
      }
      return {
        comments: state.comments,
        current_user: data.currentUser,
      };
    }
    case "COMMENT": {
      // Code Logic Here
      return {
        comments: state.comments,
        current_user: data.currentUser,
      };
    }
  }
}

//============Reducer End================//

function DataProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  /**
   * @param idArr [comment_id, reply_id] | [comment_id]
   */
  function editHandler(
    idArr: number[],
    content: string,
    action: "COMMENT_EDIT" | "REPLY_EDIT"
  ) {
    if (action === "REPLY_EDIT") {
      const commentIndex = idArr[0] - 1;
      const replyIndex = idArr[1] - (idArr[0] + 1);

      dispatch({
        type: "EDIT",
        payload: {
          content: content,
          indexArr: [commentIndex, replyIndex],
        },
      });
    }
    if (action === "COMMENT_EDIT") {
      dispatch({
        type: "EDIT",
        payload: {
          content: content,
          indexArr: idArr,
        },
      });
    }
  }

  /**
   * @param idArr [comment_id, reply_id] | [comment_id]
   */
  function removeHandler(
    idArr: number[],
    action: "COMMENT_REMOVE" | "REPLY_REMOVE"
  ) {
    if (action === "REPLY_REMOVE") {
      const commentIndex = idArr[0] - 1;
      const replyIndex = idArr[1];
      console.log([commentIndex, replyIndex]);
      dispatch({
        type: "REMOVE",
        payload: {
          content: "",
          indexArr: [commentIndex, replyIndex],
        },
      });
    }
    if (action === "COMMENT_REMOVE") {
      dispatch({
        type: "REMOVE",
        payload: {
          content: "",
          indexArr: idArr,
        },
      });
    }
  }
  function replyHandler(
    idArr: number[],
    content: string,
    action: "REPLY_COMMENT" | "REPLY_REPLY"
  ) {
    if (action === "REPLY_COMMENT") {
      const commentIndex = idArr[0] - 1;
      dispatch({
        type: "REPLY",
        payload: {
          indexArr: [commentIndex],
          content: content,
        },
      });
    }
  }
  function commentHandler() {
    // code here
  }

  const contextValue = {
    comments: state.comments,
    current_user: state.current_user,
    edit: editHandler,
    remove: removeHandler,
    reply: replyHandler,
    send: commentHandler,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
