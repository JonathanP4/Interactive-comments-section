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
import { Data } from "../../store/DataProvider";
import ButtonCard from "../UI/ButtonCard/ButtonCard";

export type Actions = "REPLY" | "COMMENT" | "EDIT" | "REMOVE";

function Comment(props: { comment: CommentType }) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const ctx = useContext(Data);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function removeComment() {
    const updatedComments = ctx.comments.filter(
      (comment) => comment.id !== props.comment.id
    );
    ctx.comments = updatedComments;

    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
  }
  function editComment() {
    if (textAreaRef.current) {
      const content = textAreaRef.current.value;

      if (content.trim().length < 1) return;

      const commentIndex = ctx.comments.findIndex(
        (comment) => comment.id === props.comment.id
      );
      const curComment = ctx.comments[commentIndex];

      curComment.content = content;
      setEditState((state) => !state);
    }
    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
  }
  function reply(content: string) {
    content = content.replaceAll(`@${props.comment.user.username}`, "");

    if (content.trim().length < 1) return;

    const commentIndex = ctx.comments.findIndex(
      (comment) => comment.id === props.comment.id
    );
    const curComment = ctx.comments[commentIndex];
    const newId = curComment.id + curComment.replies.length + 1;

    curComment.replies.push({
      id: newId,
      content: content,
      createdAt: "now",
      score: 0,
      replyingTo: props.comment.user.username,
      user: {
        image: {
          png: ctx.current_user.image.png,
          webp: ctx.current_user.image.webp,
        },
        username: ctx.current_user.username,
      },
    });
    setReplyState((state) => !state);

    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
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
              <ButtonCard clickEvent={editComment}>Update</ButtonCard>
            </>
          )}
          {!editState && <p>{props.comment.content}</p>}
        </div>
        <div className={styles.buttons}>
          {props.comment.user.username === ctx.current_user.username && (
            <>
              <Delete clickEvent={removeComment} />
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
          clickEvent={reply}
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
