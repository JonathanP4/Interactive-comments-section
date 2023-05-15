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
import { Data } from "../../store/DataProvider";
import AddComment from "../AddComment/AddComment";

function Reply(props: {
  reply: ReplyType;
  replies: ReplyType[];
  commentId: number;
}) {
  const [editState, setEditState] = useState(false);
  const [replyState, setReplyState] = useState(false);
  const ctx = useContext(Data);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function removeReply() {
    const commentIndex = ctx.comments.findIndex(
      (comment) => comment.id === props.commentId
    );
    const curComment = ctx.comments[commentIndex];
    const updatedReplies = curComment.replies.filter(
      (reply) => reply.id !== props.reply.id
    );
    curComment.replies = updatedReplies;
    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
  }
  function editReply() {
    if (textAreaRef.current) {
      const content = textAreaRef.current.value.replaceAll(
        `@${props.reply.replyingTo}`,
        ""
      );

      if (content.trim().length < 1) return;

      const commentIndex = ctx.comments.findIndex(
        (comment) => comment.id === props.commentId
      );
      const curComment = ctx.comments[commentIndex];
      const replyIndex = curComment.replies.findIndex(
        (reply) => reply.id === props.reply.id
      );
      curComment.replies[replyIndex].content = content;
      setEditState((state) => !state);
    }
    ctx.update({
      comments: ctx.comments,
      currentUser: ctx.current_user,
    });
  }

  function reply(content: string) {
    if (textAreaRef.current) textAreaRef.current.focus();

    content = content.replaceAll(`@${props.reply.replyingTo}`, "");

    if (content.trim().length < 1) return;

    const commentIndex = ctx.comments.findIndex(
      (comment) => comment.id === props.commentId
    );
    const curComment = ctx.comments[commentIndex];
    const newId = curComment.id + curComment.replies.length + 1;

    curComment.replies.push({
      id: newId,
      content: content,
      createdAt: "now",
      score: 0,
      replyingTo: props.reply.user.username,
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
              <TextArea
                ref={textAreaRef}
                content={`@${props.reply.replyingTo} ${props.reply.content}`}
              />
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
              <Delete clickEvent={removeReply} />
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
          clickEvent={reply}
          text={{ mention: props.reply.replyingTo, btnText: "Reply" }}
        />
      )}
    </div>
  );
}

export default Reply;
