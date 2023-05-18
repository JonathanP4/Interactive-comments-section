import { ReactNode, useReducer } from "react";
import data from "../data.json";
import { DataContext } from "./data-context";
import { CommentType, CurrentUserType } from "../types/types";

type Action = {
  type: "SEND" | "REMOVE" | "EDIT" | "REPLY";
  payload: {
    indexArr: number[];
    content: string;
  };
};

type State = {
  comments: CommentType[];
  current_user: CurrentUserType;
};

const initialValue = {
  comments: data.comments,
  current_user: data.currentUser,
};

function filterComments(comments: CommentType[], comment_id: number) {
  const updatedComments = comments.filter(
    (comment) => comment.id !== comment_id
  );
  return updatedComments;
}

function filterReplies(comments: CommentType[], numberArr: [number, number]) {
  const commentIndex = numberArr[0];
  const replyId = numberArr[1];

  const updatedReplies = comments[commentIndex].replies.filter(
    (reply) => reply.id !== replyId
  );
  return updatedReplies;
}

function reducer(state: State, action: Action) {
  const indexArr = action.payload.indexArr;

  switch (action.type) {
    case "SEND": {
      const id = state.comments.length + 1;
      state.comments.push({
        id: id,
        content: action.payload.content,
        createdAt: "now",
        score: 0,
        user: {
          image: {
            png: state.current_user.image.png,
            webp: state.current_user.image.webp,
          },
          username: state.current_user.username,
        },
        replies: [],
      });
      return {
        comments: state.comments,
        current_user: state.current_user,
      };
    }

    case "REMOVE": {
      if (indexArr.length === 1) {
        const updatedComments = filterComments(state.comments, indexArr[0]);

        return {
          comments: updatedComments,
          current_user: state.current_user,
        };
      } else {
        // in this case the 'indexArr' will actually contain [comment_index, reply_id]
        const currentComment = state.comments[indexArr[0]];
        const updatedReplies = filterReplies(state.comments, [
          indexArr[0],
          indexArr[1],
        ]);

        currentComment.replies = updatedReplies;

        return {
          comments: state.comments,
          current_user: state.current_user,
        };
      }
    }

    case "EDIT": {
      if (indexArr.length === 1) {
        state.comments[indexArr[0]].content = action.payload.content;
      } else {
        state.comments[indexArr[0]].replies[indexArr[1]].content =
          action.payload.content;
      }
      return {
        comments: state.comments,
        current_user: state.current_user,
      };
    }

    case "REPLY": {
      const currentComment = state.comments[indexArr[0]];
      const newId = indexArr[0] + 1 + currentComment.replies.length + 1;
      if (indexArr.length === 1) {
        currentComment.replies.push({
          id: newId,
          replyingTo: currentComment.user.username,
          score: 0,
          createdAt: "now",
          user: {
            image: {
              png: state.current_user.image.png,
              webp: state.current_user.image.webp,
            },
            username: state.current_user.username,
          },
          content: action.payload.content,
        });
        return {
          comments: state.comments,
          current_user: state.current_user,
        };
      } else {
        const mention = currentComment.replies[indexArr[1]].user.username;
        currentComment.replies.push({
          id: newId,
          replyingTo: mention,
          score: 0,
          createdAt: "now",
          user: {
            image: {
              png: state.current_user.image.png,
              webp: state.current_user.image.webp,
            },
            username: state.current_user.username,
          },
          content: action.payload.content || "",
        });
        return {
          comments: state.comments,
          current_user: state.current_user,
        };
      }
    }
  }
}

function DataProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  function send(content: string) {
    dispatch({
      type: "SEND",
      payload: {
        indexArr: [],
        content: content,
      },
    });
  }
  function edit(idArr: number[], content: string) {
    dispatch({
      type: "EDIT",
      payload: {
        indexArr: idArr,
        content: content,
      },
    });
  }
  function remove(idArr: number[]) {
    dispatch({
      type: "REMOVE",
      payload: {
        indexArr: idArr,
        content: "",
      },
    });
  }
  function reply(idArr: number[], content: string) {
    dispatch({
      type: "REPLY",
      payload: {
        indexArr: idArr,
        content: content,
      },
    });
  }

  const contextValue = {
    comments: state.comments,
    current_user: state.current_user,
    send,
    remove,
    edit,
    reply,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataProvider;
