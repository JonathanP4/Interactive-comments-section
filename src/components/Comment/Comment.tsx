import styles from "./Comment.module.css";

import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import Replies from "../Replies/Replies";
import AddComment from "../AddComment/AddComment";
import ButtonCard from "../UI/ButtonCard/ButtonCard";

import { useRef, useState } from "react";
import { CommentType, CurrentUserType } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes, commentActions } from "../../store/comments";

function Comment(props: { comment: CommentType }) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: { current_user: CurrentUserType }) => state.current_user
  );

  function deleteHandler() {
    dispatch(
      commentActions.delete({ type: actionTypes.comment, id: props.comment.id })
    );
  }
  function editHandler() {
    if (textAreaRef.current) {
      const condition = textAreaRef.current.value.trim().length > 0;
      const commentIndex = props.comment.id - 1;

      if (condition) {
        dispatch(
          commentActions.edit({
            index: commentIndex,
            content: textAreaRef.current.value,
            type: actionTypes.comment,
          })
        );
        setEditState(false);
      }
    }
  }

  function replyHandler(content: string) {
    const commentIndex = props.comment.id - 1;
    const mention = props.comment.user.username;

    if (content.trim().length > 0) {
      dispatch(
        commentActions.reply({
          index: commentIndex,
          content,
          mention,
        })
      );
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
          {props.comment.user.username === currentUser.username && (
            <>
              <Delete clickEvent={deleteHandler} />
              <Edit clickEvent={() => setEditState((state) => !state)} />
            </>
          )}
          {props.comment.user.username !== currentUser.username && (
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
