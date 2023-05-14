import { useContext, useRef, useState } from "react";
import { ReplyType } from "../../types/types";
import Card from "../UI/Card/Card";
import Delete from "../UI/DeleteButton/Delete";
import Edit from "../UI/EditButton/Edit";
import Rating from "../UI/RatingButton/Rating";
import TextArea from "../UI/TextArea/TextArea";
import ReplyBtn from "../UI/ReplyButton/ReplyBtn";
import styles from "./Reply.module.css";
import Data from "../../store/data-context";
import ButtonCard from "../UI/ButtonCard/ButtonCard";
import { Actions } from "../Comment/Comment";

function Reply(props: {
  reply: ReplyType;
  sendData: (id: number, action: Actions, content?: string) => void;
}) {
  const ctx = useContext(Data);
  const [editState, setEditState] = useState(false);

  const replyRef = useRef<HTMLDivElement>(null);

  function editReply() {
    const content = replyRef.current?.querySelector(
      "div textarea"
    ) as HTMLTextAreaElement;

    props.sendData(props.reply.id, "EDIT", content.value);
    setEditState((curState) => !curState);
  }

  function removeReply() {
    props.sendData(props.reply.id, "REMOVE");
  }

  return (
    <Card className={styles["reply-card"]}>
      <div className={styles["rating-container"]}>
        <Rating score={props.reply.score} />
      </div>
      <div className={styles.profile}>
        <img src={props.reply.user.image.png} alt="" />
        <span className={styles.username}>{props.reply.user.username}</span>
        <span>{props.reply.createdAt}</span>
      </div>
      <div ref={replyRef} className={styles.reply}>
        {editState && (
          <>
            <TextArea content={props.reply.content} />
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
          <ReplyBtn clickEvent={() => console.log("l")} />
        )}
      </div>
    </Card>
  );
}

export default Reply;
