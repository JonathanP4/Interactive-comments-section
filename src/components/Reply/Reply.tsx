import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import styles from "./Reply.module.css";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import AddComment from "../AddComment/AddComment";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { CommentType, CurrentUserType, ReplyType } from "../../types/types";
import { actionTypes, commentActions } from "../../store/comments";

function Reply(props: {
  reply: ReplyType;
  replies: ReplyType[];
  commentId: number;
}) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);

  const currentUser = useSelector(
    (state: { current_user: CurrentUserType }) => state.current_user
  );
  const comments = useSelector(
    (state: { comments: CommentType[] }) => state.comments
  );
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function getReplyIndex() {
    const commentIndex = props.commentId - 1;
    const replyIndex = comments[commentIndex].replies.findIndex(
      (reply) => reply.id === props.reply.id
    );
    return replyIndex;
  }

  function deleteReply() {
    const index = props.commentId - 1;
    dispatch(
      commentActions.delete({
        index,
        id: props.reply.id,
        type: actionTypes.reply,
      })
    );
  }

  function editReply() {
    const commentIndex = props.commentId - 1;

    if (!textAreaRef.current) return;

    const condition = textAreaRef.current.value.trim().length > 0;
    const replyIndex = getReplyIndex();

    if (condition) {
      dispatch(
        commentActions.edit({
          index: [commentIndex, replyIndex],
          content: textAreaRef.current.value,
          type: actionTypes.reply,
        })
      );
      setEditState(false);
    }
  }

  function replyHandler(content: string) {
    const commentIndex = props.commentId - 1;
    const mention = props.reply.user.username;

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
      <Card className={styles["reply-card"]}>
        <div className={styles["rating-container"]}>
          <Rating score={props.reply.score} />
        </div>
        <div className={styles.profile}>
          <img src={props.reply.user.image.png} alt="" />
          <span className={styles.username}>{props.reply.user.username}</span>
          <span>{props.reply.createdAt}</span>
        </div>
        <div className={styles.reply}>
          {editState && (
            <>
              <TextArea ref={textAreaRef} content={props.reply.content} />
              <ButtonCard clickEvent={editReply}>Update</ButtonCard>
            </>
          )}
          {!editState && (
            <div>
              <span className={styles.mention}>@{props.reply.replyingTo}</span>{" "}
              <span>{props.reply.content}</span>
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          {props.reply.user.username === currentUser.username && (
            <>
              <Delete clickEvent={deleteReply} />
              <Edit clickEvent={() => setEditState((state) => !state)} />
            </>
          )}
          {props.reply.user.username !== currentUser.username && (
            <ReplyBtn clickEvent={() => setReplyState((state) => !state)} />
          )}
        </div>
      </Card>
      {replyState && (
        <AddComment
          clickEvent={replyHandler}
          text={{ mention: props.reply.replyingTo, btnText: "Reply" }}
        />
      )}
    </div>
  );
}

export default Reply;
