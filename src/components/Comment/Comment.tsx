import { useContext, useRef, useState } from "react";
import { CommentType } from "../../types/types";
import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import styles from "./Comment.module.css";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import Replies from "../Replies/Replies";
import AddComment from "../AddComment/AddComment";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import { DataContext } from "../../context/data-context";

function Comment(props: { comment: CommentType }) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const ctx = useContext(DataContext);

  function deleteHandler() {
    ctx.remove([props.comment.id]);
  }
  function editHandler() {
    if (textAreaRef.current) {
      const condition = textAreaRef.current.value.trim().length > 0;
      const commentIndex = props.comment.id - 1;
      if (condition) {
        ctx.edit([commentIndex], textAreaRef.current.value);
        setEditState(false);
      }
    }
  }
  function replyHandler(content: string) {
    const commentIndex = props.comment.id - 1;
    if (content.trim().length > 0) {
      ctx.reply([commentIndex], content);
      setReplyState(false);
    }
  }

  return (
    <div className={styles["card-container"]}>
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
          {editState && (
            <>
              <TextArea ref={textAreaRef} content={props.comment.content} />
              <ButtonCard clickEvent={editHandler}>Update</ButtonCard>
            </>
          )}
          {!editState && <p>{props.comment.content}</p>}
        </div>
        <div className={styles.buttons}>
          {props.comment.user.username === ctx.current_user.username && (
            <>
              <Delete clickEvent={deleteHandler} />
              <Edit clickEvent={() => setEditState((state) => !state)} />
            </>
          )}
          {props.comment.user.username !== ctx.current_user.username && (
            <ReplyBtn clickEvent={() => setReplyState((state) => !state)} />
          )}
        </div>
      </Card>
      {replyState && (
        <AddComment
          clickEvent={replyHandler}
          text={{ mention: props.comment.user.username, btnText: "Reply" }}
        />
      )}
      {props.comment.replies.length > 0 && (
        <Replies commentId={props.comment.id} replies={props.comment.replies} />
      )}
    </div>
  );
}

export default Comment;
