import styles from "./Replies.module.css";
import Reply from "../Reply/Reply";
import { ReplyType } from "../../types/types";
import { Actions } from "../Comment/Comment";

function Replies(props: {
  replies: ReplyType[];
  sendData: (id: number, action: Actions, content?: string) => void;
}) {
  function sendReplyData(id: number, action: Actions, content = "") {
    switch (action) {
      case "EDIT":
        props.sendData(id, "EDIT", content);
        break;
      case "REMOVE":
        props.sendData(id, "REMOVE");
        break;
      case "REPLY":
    }
  }
  return (
    <div className={styles.replies}>
      {props.replies.map((reply) => (
        <Reply sendData={sendReplyData} key={reply.id} reply={reply} />
      ))}
    </div>
  );
}

export default Replies;
