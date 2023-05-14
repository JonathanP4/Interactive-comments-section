import { useContext, useState } from "react";
import { CommentType } from "../../types/types";
import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import styles from "./Comment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import Replies from "../Replies/Replies";
import Data from "../../store/data-context";
import AddComment from "../AddComment/AddComment";

export type Actions = "REPLY" | "COMMENT" | "EDIT" | "REMOVE";

function Comment(props: { comment: CommentType }) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const ctx = useContext(Data);

  function sendReplyData(id: number, action: Actions, content = "") {
    switch (action) {
      case "EDIT":
        ctx.edit([props.comment.id, id], content, "REPLY_EDIT");
        break;
      case "REMOVE":
        ctx.remove([props.comment.id, id], "REPLY_REMOVE");
        break;
      case "REPLY":
        ctx.reply([props.comment.id, id], content, "REPLY_REPLY");
        break;
    }
  }

  function sendCommentData(action: Actions, content = "") {
    switch (action) {
      case "EDIT":
        ctx.edit([props.comment.id], content, "COMMENT_EDIT");
        break;
      case "REMOVE":
        ctx.remove([props.comment.id], "COMMENT_REMOVE");
        break;
      case "REPLY":
        ctx.reply([props.comment.id], content, "REPLY_COMMENT");
        setReplyState((state) => !state);
        break;
    }
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <Card className={styles["comment-card"]}>
        <div className={styles["rating-container"]}>
          <Rating score={props.comment.score} />
        </div>
        <div className={styles.profile}>
          <img src={props.comment.user.image.png} alt="" />
          <span className={styles.username}>{props.comment.user.username}</span>
          <span>{props.comment.createdAt}</span>
        </div>
        <div className={styles.comment}>
          {editState && <TextArea content={props.comment.content} />}
          {!editState && <p>{props.comment.content}</p>}
        </div>
        <div className={styles.buttons}>
          {props.comment.user.username === ctx.current_user.username && (
            <>
              <Delete clickEvent={() => sendCommentData("REMOVE")} />
              <Edit clickEvent={() => setEditState((state) => !state)} />
            </>
          )}
          {props.comment.user.username !== ctx.current_user.username && (
            <ReplyBtn clickEvent={() => setReplyState((state) => !state)} />
          )}
        </div>
      </Card>
      {props.comment.replies.length > 0 && (
        <Replies sendData={sendReplyData} replies={props.comment.replies} />
      )}
      {replyState && (
        <AddComment
          clickEvent={sendCommentData}
          mention={props.comment.user.username}
        />
      )}
    </div>
  );
}

export default Comment;
