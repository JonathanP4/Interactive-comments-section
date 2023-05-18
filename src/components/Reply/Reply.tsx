import { useContext, useRef, useState } from "react";
import { ReplyType } from "../../types/types";
import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import styles from "./Reply.module.css";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import AddComment from "../AddComment/AddComment";
import { DataContext } from "../../context/data-context";

function Reply(props: {
  reply: ReplyType;
  replies: ReplyType[];
  commentId: number;
}) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const ctx = useContext(DataContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function getReplyIndex() {
    const commentIndex = props.commentId - 1;
    const replyIndex = ctx.comments[commentIndex].replies.findIndex(
      (reply) => reply.id === props.reply.id
    );
    return replyIndex;
  }

  function deleteReply() {
    const commentIndex = props.commentId - 1;
    ctx.remove([commentIndex, props.reply.id]);
  }

  function editReply() {
    const commentIndex = props.commentId - 1;

    if (textAreaRef.current) {
      const condition = textAreaRef.current.value.trim().length > 0;
      const replyIndex = getReplyIndex();

      if (condition) {
        ctx.edit([commentIndex, replyIndex], textAreaRef.current.value);
        setEditState(false);
      }
    }
  }

  function replyHandler(content: string) {
    const commentIndex = props.commentId - 1;
    const replyIndex = getReplyIndex();

    if (content.trim().length > 0) {
      ctx.reply([commentIndex, replyIndex], content);
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
          {props.reply.user.username === ctx.current_user.username && (
            <>
              <Delete clickEvent={deleteReply} />
              <Edit clickEvent={() => setEditState((state) => !state)} />
            </>
          )}
          {props.reply.user.username !== ctx.current_user.username && (
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
